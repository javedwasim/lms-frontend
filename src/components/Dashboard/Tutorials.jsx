import Link from 'next/link';
import moment from 'moment';

import { Col, Row, ProgressBar } from 'react-bootstrap';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { handleImageUrl } from '@/lib/utils';

import '@/styles/DashboardSidebar.css';
import { useCourseDetails } from '@/hooks/course';

const videoThumbnail =
  'video_image/zktRHkHJcHdNMo2NROlTqoB15GxB9DpGIhlXRyfB.png';

const timeLeft = (total, watched) => {
  let wat = Math.round(watched);

  let watched_mili_eseconds = moment.duration(wat, 'seconds');
  let total_mili_eseconds = moment.duration(total, 'seconds');

  let percent =
    Number(total_mili_eseconds._milliseconds) -
    Number(watched_mili_eseconds._milliseconds);

  var minutes = Math.floor(percent / 60000);
  var seconds = ((percent % 60000) / 1000).toFixed(0);

  if (minutes || seconds < 0) {
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  } else {
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
};

export default function Tutorials({ courseId }) {
  const { data: courseDetails } = useCourseDetails(courseId);

  return (
    <Col lg={4} md={6}>
      <div
        className={
          courseDetails.tutorials_by_category?.length > 5
            ? 'tutorials-section fix-height'
            : 'tutorials-section'
        }
      >
        <div className="heading-tutorials">
          <h3 className="mb-0">
            <Link href={`/tutorials/${courseDetails?.id}`}>
              <img src="/icons/play-icon.svg" alt="icon" />
              Tutorials
              {!courseDetails.is_package_purchased && (
                <div className="unlock-btn-free">Try out sample tutorials</div>
              )}
              <span className="float-end">
                <img src="/icons/right-arrow.svg" alt="icon" />
              </span>
            </Link>
          </h3>
        </div>
        <div
          className={
            !courseDetails.is_package_purchased ? 'blur-bg bbb' : 'bbb'
          }
        >
          <div className="last-video-play ">
            <div
              className="video-bg"
              style={{ height: '6rem', width: '12rem' }}
            >
              <img
                src={videoThumbnail && handleImageUrl(videoThumbnail)}
                width="100%"
                height="100%"
                alt="img"
              />
            </div>

            {courseDetails.is_package_purchased ? (
              <Link
                href={`/tutorials/${courseDetails?.id}/category/${courseDetails?.last_watched_tutorial?.category_id}?tutorial=${courseDetails?.last_watched_tutorial?.tutorial_id}&watched_time=${courseDetails?.last_watched_tutorial?.watched_time}`}
              >
                <div className="video-title">
                  <span>Continue where you left off...</span>

                  <p>
                    {courseDetails?.last_watched_tutorial?.category?.category_name
                      ?.charAt(0)
                      ?.toUpperCase() +
                      courseDetails?.last_watched_tutorial?.category?.category_name?.slice(
                        1
                      )}
                  </p>

                  <p className="tag-video">
                    {
                      courseDetails?.last_watched_tutorial?.tutorial
                        ?.chapter_name
                    }
                  </p>

                  <span className="float-end">
                    {timeLeft(
                      courseDetails.last_watched_tutorial?.total_video_time,
                      courseDetails.last_watched_tutorial?.watched_time
                    )}{' '}
                    min left
                  </span>
                </div>
              </Link>
            ) : (
              <div className="video-title">
                <span>Continue where you left off...</span>

                <p>
                  {courseDetails?.last_watched &&
                    courseDetails.last_watched?.category_name
                      ?.charAt(0)
                      .toUpperCase() +
                      courseDetails.last_watched?.category_name?.slice(1)}
                </p>

                <p className="tag-video">
                  {courseDetails && courseDetails.last_watched?.chapter_name}
                </p>

                <span className="float-end">
                  {timeLeft(
                    courseDetails.last_watched?.total_video_time,
                    courseDetails.last_watched?.watched_time
                  )}
                  min left
                </span>
              </div>
            )}
          </div>

          <Row className="mb-5">
            <Col lg={6} md={6}>
              <h3 className="com-teg">Course completion</h3>

              <div className="tutorial-percent-bar total-fil-ds position-relative W-100">
                <CircularProgressbarWithChildren
                  value={
                    courseDetails?.total_tutorials
                      ? (courseDetails?.watched_tutorial_count * 100) /
                        courseDetails?.total_tutorials
                      : 0
                  }
                >
                  <div style={{ color: '#663794', fontSize: '25px' }}>
                    {courseDetails?.total_tutorials
                      ? (
                          (courseDetails?.watched_tutorial_count * 100) /
                          courseDetails?.total_tutorials
                        ).toFixed()
                      : 0}
                    %
                  </div>

                  <span className="circulartext">Completed</span>
                </CircularProgressbarWithChildren>
              </div>
            </Col>

            <Col lg={6} md={6}>
              <div className="tutorials-seen">
                <ul className="p-0">
                  <li>
                    <span></span>
                    <strong>
                      {courseDetails && courseDetails?.watched_tutorial_count}
                    </strong>
                    Tutorials seen
                  </li>
                  <li>
                    <span className="no-fill"></span>
                    <strong>
                      {courseDetails &&
                        courseDetails?.total_tutorials -
                          courseDetails?.watched_tutorial_count}
                    </strong>
                    Tutorials remaining
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <div className="pr-main-se">
            {courseDetails &&
              courseDetails.tutorials_by_category?.map((category) => (
                <div className="progress-section" key={Math.random()}>
                  <h4>
                    {category.category_name?.charAt(0).toUpperCase() +
                      category.category_name?.slice(1)}

                    <span>
                      {category.watched_tutorials_count} of{' '}
                      {category.tutorials_count}{' '}
                      <p
                        className="tutorial-seen"
                        style={{ display: 'inline-grid' }}
                      >
                        tutorials seen
                      </p>
                    </span>
                  </h4>
                  <ProgressBar
                    now={
                      Number(category.watched_tutorials_count * 100) /
                      Number(category.tutorials_count)
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Col>
  );
}
