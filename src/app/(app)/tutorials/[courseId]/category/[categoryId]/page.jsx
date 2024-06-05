'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import moment from 'moment';

import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import { PieChart } from 'react-minimal-pie-chart';
import { FaLock } from 'react-icons/fa';

import 'react-circular-progressbar/dist/styles.css';
import '@/styles/DashboardSidebar.css';
import '@/styles/Tutorials.css';
import '@/styles/Questions.css';
import '@/styles/TutorialCategory.css';

import Header from '@/components/Auth/Header';
import Sidebar from '@/components/Dashboard/Sidebar';
import Files from '@/components/Tutorials/Files';
import ShowTranscriptModal from '@/components/Tutorials/ShowTransModal';
import CustomModal from '@/components/Tutorials/CustomModal';
import CommentVideo from '@/components/Tutorials/CommentVideo';

import { useAuth } from '@/hooks/auth';
import { useCategoryTutorial, useTutorialComments } from '@/hooks/tutorial';
import { addTutorialBookmark, addTutorialWatchlist, compelteVideoTutorial } from '@/requests/tutorial';
import { useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
const WATCH_TIME_INTERVAL = 5000;

export default function TutorialCategory({ params }) {
  const courseId = parseInt(params.courseId);
  const categoryId = parseInt(params.categoryId);

  const searchParams = useSearchParams();

  const lastWatchedTutorialId = searchParams.get('tutorial')
      ? parseInt(searchParams.get('tutorial'))
      : null;

  const lastWatchedTime = searchParams.get('watched_time')
      ? parseInt(searchParams.get('watched_time'))
      : null;

  const { user } = useAuth({ middleware: 'auth' });
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [transShow, setTransShow] = useState(false);
  const [tutorialId, setTutorialId] = useState(null);
  const [videoWatchTime, setVideoWatchTime] = useState(0);
  const [player, setplayer] = useState(false);

  const { data, mutate } = useCategoryTutorial(courseId, categoryId);
  const { data: tutorialComments } = useTutorialComments(tutorialId);

  const playerRef = useRef();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (data?.tutorial_list?.length > 0) {
      if (lastWatchedTutorialId) {
        setVideoData(
            data?.tutorial_list?.find(
                (tutorial) => tutorial.tutorial_id === lastWatchedTutorialId
            )
        );
        setTutorialId(lastWatchedTutorialId);
      } else {
        setVideoData(data?.tutorial_list[0]);
        setTutorialId(data?.tutorial_list[0].tutorial_id);
      }
    }
  }, [data]);

  useEffect(() => {
    if (player) {
      const interval = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();

          if (currentTime) {
            setVideoWatchTime(currentTime);
            addTutorialWatchlist(tutorialId, courseId, currentTime);
          }
        }
      }, WATCH_TIME_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [player]);

  const onReady = useCallback(() => {
    if (!isReady) {
      playerRef.current.seekTo(lastWatchedTime, 'seconds');
      setIsReady(true);
    }
  }, [isReady]);

  const timeLeft = (total, watched) => {
    let watched_mili_eseconds = moment.duration(watched, 'seconds');
    let total_mili_eseconds = moment.duration(total, 'seconds');

    let percent =
        (watched_mili_eseconds._milliseconds /
            total_mili_eseconds._milliseconds) *
        100;

    return percent;
  };

  const callEndVideo = () => {
    addTutorialWatchlist(tutorialId, courseId, videoWatchTime);
  };

  const showVideoData = (e, res, i) => {
    e.preventDefault();

    setVideoData(res);
    setTutorialId(res.tutorial_id);
    setTransShow(true);
  };

  const transcriptData = data?.tutorial_list?.find(
      (res) => videoData?.tutorial_id == res.tutorial_id
  );

  const clearWatchTime = async (res) => {
    var hms = res?.total_video_time;
    var timeArr = hms.split(':');
    var seconds = +timeArr[0] * 60 * 60 + +timeArr[1] * 60 + +timeArr[2];

    setLoading(true);
    if(res?.total_video_time === res?.my_watched_time){
      compelteVideoTutorial(res?.tutorial_id, courseId, 0);
      mutate();
      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Marked Incomplete',
          timer: 2000,
        });
      }, 3000);
      setLoading(false);
    }else{
      compelteVideoTutorial(res?.tutorial_id, courseId, res?.total_video_time);
      mutate();
      Swal.fire({
        icon: 'success',
        title: 'Marked as Complete',
        timer: 2000,
      });
      setLoading(false);
    }
    // if (res.is_exist_in_plan == 1) {
    //   await addTutorialWatchlist(res.tutorial_id, courseId, seconds);
    //
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Tutorial Added to Watched List',
    //     timer: 2000,
    //   });
    // } else {
    //   return;
    // }
  };

  const getVideoTiming = () => {};

  const handleScriptModel = () => {};

  const handleBookmarkTutorial = async (e, tutorial) => {
    e.preventDefault();

    await addTutorialBookmark(courseId, videoData, tutorial.tutorial_id);

    mutate();
  };

  const handleCompleteVideo = () => {
    setLoading(true);
    compelteVideoTutorial(tutorialId, courseId, videoData?.total_video_time);
    // Manually trigger a refetch of the data
    mutate();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
      <div>
        <Header />
        <div className="box-card">
          <Sidebar
              is_question_number={'1'}
              is_Tutorial={'1'}
              is_Test={'1'}
              courseId={courseId}
          />

          <div className="hero-section">
            <Row>
              <Col md={12}>
                <div className="mt-4 mb-4 section-heading float-start">
                  <h2 className="m-0">
                    {data
                        ? data.category_name?.charAt(0).toUpperCase() +
                        data.category_name?.slice(1)
                        : ''}
                  </h2>

                  <div className="mt-1 mb-4 steps-cd">
                    <Link href={`/dashboard/${courseId}`}>Progress</Link> /
                    <Link href={`/tutorials/${courseId}`}> Tutorials </Link> /{' '}
                    {data &&
                        data.category_name?.charAt(0).toUpperCase() +
                        data.category_name?.slice(1)}
                  </div>
                </div>

                <p className="which-essopn">
                  {data && data.seened_tutorial} of {data && data.total_tutorial}{' '}
                  lessons seen
                </p>
                <div className="tutorial-percent-bar detail-section">
                  <CircularProgressbar
                      value={Number(data ? data.score_in_percent : 0).toFixed()}
                      text={`${Number(
                          data ? data.score_in_percent : 0
                      ).toFixed()}%`}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={5} md={12}>
                <div>
                  {loading && (
                      <div className="loading-container">
                        <div className="loading-spinner">
                          <CircularProgress />
                        </div>
                      </div>
                  )}
                </div>

                <div className="course-detail">
                  <ul>
                    {data && data.tutorial_list?.length > 0 ? (
                        data.tutorial_list?.map((tutorial, i) => (
                            <li
                                key={i}
                                className={
                                  data?.is_plan_exist == '1' ||
                                  tutorial.test_mode === '1'
                                      ? ''
                                      : 'faded-li'
                                }
                            >
                               <div className="chart-heading">
                                <div
                                    title={'Please click on circle to Mark Video Complete or Incomplete'}
                                    className="chart-round mt-1"
                                    onClick={() => clearWatchTime(tutorial)}
                                >
                                  <PieChart
                                      style={{ cursor: 'pointer' }}
                                      data={[
                                        {
                                          title: 'One',
                                          value: Number(
                                              timeLeft(
                                                  tutorial.total_video_time,
                                                  tutorial.my_watched_time
                                              )
                                          ),
                                          color: '#8dc52e',
                                        },
                                        {
                                          title: 'Two',
                                          value:
                                              100 -
                                              timeLeft(
                                                  tutorial.total_video_time,
                                                  tutorial.my_watched_time
                                              ),
                                          color: '#fff',
                                        },
                                      ]}
                                      style={{ cursor: 'pointer', border: tutorial.total_video_time === tutorial.my_watched_time ? 'none !important' : '1px solid #fc5656', borderRadius: '50%' }}
                                      
                                  />
                                </div>

                                <div>
                                  {data &&
                                      data.tutorial_list?.length > 0 &&
                                      (data?.is_plan_exist == '1' ||
                                      tutorial.test_mode == '1' ? (
                                          <p
                                              className="chepter_title"
                                              onClick={(e) => showVideoData(e, tutorial, i)}
                                          >
                                            {tutorial.chapter_name}
                                          </p>
                                      ) : (
                                          <p
                                              className="chepter_title"
                                              onClick={(e) => {
                                                setIsReady(false);
                                                showVideoData(e, tutorial, i);
                                              }}
                                          >
                                            {tutorial.chapter_name}
                                          </p>
                                      ))}
                                </div>
                              </div>
                              <div className="flg-btn">
                                {data?.is_plan_exist == '1' ||
                                tutorial.test_mode == '1' ? (
                                    <>
                                      <img
                                          src={
                                            tutorial.is_tutorial_bookmarked == '1'
                                                ? '/icons/red-flag.png'
                                                : '/icons/flag.png'
                                          }
                                          alt="img"
                                          onClick={(e) =>
                                              handleBookmarkTutorial(e, tutorial)
                                          }
                                          style={{ cursor: 'pointer' }}
                                      />
                                      <Link href={`/questions/${courseId}`}>
                                        <button>PRACTICE</button>
                                      </Link>
                                    </>
                                ) : (
                                    <Link href={`/plan/${courseId}/1`}>
                                      <button className=" video-buy-cours">
                                        <i>
                                          <FaLock />
                                        </i>{' '}
                                        Unlock to view
                                      </button>
                                    </Link>
                                )}
                              </div>
                            </li>
                        ))
                    ) : (
                        <p>Tutorial List is Empty! </p>
                    )}
                  </ul>
                </div>
              </Col>

              <Col lg={7} md={12}>
                {data && data.tutorial_list?.length > 0 ? (
                    data?.is_plan_exist === '1' || videoData?.test_mode === '1' ? (
                        <div className="video-section ">
                          <h3>{videoData ? videoData?.video_heading : ''}</h3>
                          <hr />

                          <h4>{videoData?.chapter_name}</h4>

                          <ReactPlayer
                              ref={playerRef}
                              url={videoData?.video_url}
                              onReady={onReady}
                              playing={false}
                              onPlay={() => setplayer(true)}
                              onPause={() => setplayer(false)}
                              onEnded={callEndVideo}
                              onDuration={getVideoTiming}
                              pip
                              controls
                              onProgress={(data) =>
                                  setVideoWatchTime(data?.playedSeconds)
                              }
                              width="100%"
                              height="600"
                          />

                          {videoData?.video_url && (
                              <button className="btn btn-outline-primary" onClick={handleCompleteVideo}>
                                {videoData?.total_video_time === videoData?.my_watched_time ? "Mark Incomplete" : "Mark as Complete"}
                              </button>
                          )}
                          <br /><hr />

                          <h3>{data?.tutorial_list ? videoData?.pdf_heading : ''}</h3>
                          {videoData?.pdf_url && (  // Check if pdf_url is not empty
                              <>
                                <iframe
                                    src={videoData.pdf_url + '#toolbar=0'}
                                    style={{ height: '100vh', width: '100%' }}
                                />
                                <hr />
                              </>
                          )}
                          {videoData?.custom_code &&
                              (videoData?.custom_code?.startsWith('<iframe') ? (
                                  <div
                                      className="mt-4"
                                      dangerouslySetInnerHTML={{
                                        __html: videoData?.custom_code,
                                      }}
                                  ></div>
                              ) : (
                                  <div>
                                    <iframe
                                        allowFullScreen={true}
                                        height="400px"
                                        width={'100%'}
                                        src={videoData?.custom_code + '#toolbar=0'}
                                    ></iframe>
                                  </div>
                              ))}

                          <Tabs
                              defaultActiveKey="file"
                              transition={true}
                              id="noanim-tab-example"
                              className="p-0 mb-3 transcript add-comt-note"
                          >
                            <Tab eventKey="file" title="FILES">
                              <Files maindata={transcriptData} />
                            </Tab>
                            <Tab eventKey="home" title="TRANSCRIPT">
                              <ShowTranscriptModal
                                  show={transShow}
                                  onHide={() => setTransShow(false)}
                                  label="Add Note"
                                  maindata={transcriptData}
                              />
                            </Tab>
                            <Tab eventKey="profile" title="ADD NOTES">
                              <CustomModal
                                  user_detail={user}
                                  show={modalShow}
                                  onHide={() => setModalShow(false)}
                                  label="Add New Note"
                                  fieldLabel="Note"
                                  tutorial_id={tutorialId}
                                  maindata={transcriptData}
                              />
                            </Tab>

                            <Tab eventKey="comments" title="COMMENTS">
                              <CommentVideo
                                  show={modalShow}
                                  onHide={() => setModalShow(false)}
                                  label="Add New Comment"
                                  fieldLabel="Note"
                                  tutorial_id={tutorialId}
                                  maindata={tutorialComments}
                              />
                            </Tab>
                          </Tabs>
                        </div>
                    ) : (
                        <div className="video-section">
                          <h4>
                            {videoData?.chapter_name}
                            <button className="active" onClick={handleScriptModel}>
                              TRANSCRIPT
                            </button>
                            <button onClick={() => setModalShow(true)}>
                              ADD NOTES
                            </button>
                          </h4>
                          <div className="purches-modal backimg">
                            <div className="video-trial-free">
                              <div className="modal-icon-lock">
                                <img src="/icons/lock-icon.png" alt="img" />
                              </div>
                              <div className="detail-why">
                                <p style={{ color: 'black' }}>
                                  This is a premium lesson <br /> Please purchase the
                                  course to access it{' '}
                                </p>
                                <Link href={`/plan/${courseId}/1`}>
                                  Unlock this course
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                    )
                ) : (
                    'Tutorial Video Not Available Yet!'
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
  );
}
