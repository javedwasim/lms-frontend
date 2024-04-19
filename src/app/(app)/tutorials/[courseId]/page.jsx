'use client';

import React from 'react';
import Link from 'next/link';
import moment from 'moment';

import Header from '@/components/Auth/Header';
import Sidebar from '@/components/Dashboard/Sidebar';

import { Row, Col } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import '@/styles/DashboardSidebar.css';
import '@/styles/Tutorials.css';
import '@/styles/Questions.css';

import { useAuth } from '@/hooks/auth';
import { useTutorials } from '@/hooks/tutorial';

export default function Tutorials({ params }) {
  const courseId = parseInt(params.courseId);

  const { user } = useAuth({ middleware: 'auth' });
  const { data } = useTutorials(courseId);

  const bgColorClasses = ['red-bg', 'gr-bg', 'blue-bg', 'cyan-bg', 'per-bg'];

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDate = (date) => {
    const todayDate = `${new Date(date).getDate()}`;
    return todayDate;
  };
  const getMonth = (date) => {
    const Month = `${new Date(date).getMonth()}`;
    return month[Month];
  };

  const truncate = (str) => {
    return str?.length > 25 ? str?.substring(0, 25) + '...' : str;
  };

  const timeLeft = (total, watched) => {
    let watchedRounded = Math.round(watched);

    let watchedTimeInMilliseconds = moment.duration(watchedRounded, 'seconds');
    let totalTimeInMilliSeconds = moment.duration(total, 'seconds');

    let percent =
      Number(totalTimeInMilliSeconds._milliseconds) -
      Number(watchedTimeInMilliseconds._milliseconds);

    let minutes = Math.floor(percent / 60000);
    let seconds = ((percent % 60000) / 1000).toFixed(0);

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
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
          <>
            <Row>
              <Col md={12}>
                <div className="section-heading">
                  <h2 className="m-0 mt-4 tuto-heading">Tutorials</h2>

                  <p className="mt-1 mb-5 steps-cd">
                    <Link href={`/dashboard/${courseId}`}>Progress</Link> /
                    Tutorials
                  </p>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={5} md={12}>
                {data &&
                  data?.category_list?.map((category, i) => (
                    <React.Fragment key={i}>
                      <Link
                        href={`/tutorials/${courseId}/category/${category.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          key={i}
                          className={`tutorials-lessons ${
                            bgColorClasses[i % 5]
                          }`}
                        >
                          <h3>
                            {category.category_name.charAt(0).toUpperCase() +
                              category.category_name.slice(1)}
                          </h3>
                          <p>
                            {category.watched_tutorials_count} of{' '}
                            {category.tutorials_count} lessons seen
                          </p>
                          <div className="tutorial-percent-bar">
                            <CircularProgressbar
                              value={
                                category.tutorials_count
                                  ? (
                                      Number(
                                        category.watched_tutorials_count * 100
                                      ) / Number(category.tutorials_count)
                                    ).toFixed()
                                  : 0
                              }
                              text={`${
                                category.tutorials_count
                                  ? (
                                      Number(
                                        category.watched_tutorials_count * 100
                                      ) / Number(category.tutorials_count)
                                    ).toFixed()
                                  : 0
                              }%`}
                            />
                          </div>
                        </div>
                      </Link>
                    </React.Fragment>
                  ))}
              </Col>

              <Col lg={5} md={12}>
                {data && data?.weekly_webinar && (
                  <Link
                    href={data.weekly_webinar.web_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="workshop1">
                      <div className="workshop">
                        <div className="img-icon-workshop w-100 d-inline-block">
                          <div className="date-curent float-end">
                            <h1>
                              <span>
                                {data.weekly_webinar.date
                                  ? getMonth(data.weekly_webinar.date)
                                  : ''}
                              </span>
                              {data.weekly_webinar?.date
                                ? getDate(data.weekly_webinar.date)
                                : ''}
                            </h1>
                          </div>
                        </div>
                        <h3>
                          {data.weekly_webinar.title}
                          &nbsp;
                          <img src="/icons/right-arrow.svg" />
                        </h3>
                        <p>
                          This week:{' '}
                          <strong>
                            {data.weekly_webinar.description ? (
                              <span>
                                {truncate(data.weekly_webinar.description)}
                              </span>
                            ) : (
                              <span>No Webinar Available Yet!</span>
                            )}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </Link>
                )}

                {data && data?.one_day_workshop && (
                  <Link
                    href={data.one_day_workshop.web_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="workshop1">
                      <div className="workshop">
                        <div className="img-icon-workshop w-100 d-inline-block">
                          <img className="float-end" src="/icons/book.svg" />
                        </div>
                        <h3>
                          <span>{truncate(data?.one_day_workshop.title)}</span>{' '}
                          <img src="/icons/right-arrow.svg" />
                        </h3>

                        <p>
                          {data.one_day_workshop.description ? (
                            <span>
                              {truncate(data?.one_day_workshop.description)}
                            </span>
                          ) : (
                            <span>No Webinar Available Yet!</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                )}

                {data && data?.last_watched && (
                  <div className="clearfix workshop left-lessoons-section">
                    <span>Continue where you left off...</span>
                    <h4>
                      <Link
                        href={`/tutorials/${courseId}/category/${data?.last_watched?.category_id}`}
                      >
                        {data.last_watched && data.last_watched.chapter_name}{' '}
                        <img src="/icons/right-arrow-2.svg" />
                      </Link>
                    </h4>
                    <p>
                      {data.last_watched.category_name ? (
                        data.last_watched.category_name
                          .charAt(0)
                          .toUpperCase() +
                        data.last_watched.category_name.slice(1)
                      ) : (
                        <>No Video Found</>
                      )}{' '}
                      <span className="float-end">
                        {timeLeft(
                          data.last_watched.total_video_time,
                          data.last_watched.watched_time
                        )}{' '}
                        min left
                      </span>
                    </p>
                  </div>
                )}
              </Col>
            </Row>
          </>
        </div>
      </div>
    </div>
  );
}
