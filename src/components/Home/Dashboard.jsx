import React from 'react';
import Link from 'next/link';

import { Col, Container, Row } from 'react-bootstrap';

import { useNavbar } from '@/context/navbar';
import { useCourses } from '@/hooks/course';
import { useAuth } from '@/hooks/auth';

import { truncate } from '@/lib/utils';
import { groupBy } from 'lodash';

export default function Dashboard() {
  const { navbarCollpase } = useNavbar();

  const { user } = useAuth({ middleware: 'guest' });

  const { data: courses, isLoading } = useCourses();
  const groupedCourses = groupBy(courses, 'type');

  return (
    <div className={navbarCollpase ? 'hero-section show-main' : 'hero-section'}>
      <Container fluid>
        {user &&
          courses &&
          courses.filter((course) => course.isEnrolled).length > 0 && (
            <Row>
              <Col md={12}>
                <div className="section-heading">
                  <h2>My Enrolled Courses</h2>
                </div>
              </Col>
            </Row>
          )}

        {/* Enrolled Courses */}
        <Row>
          {user &&
            courses &&
            courses
              .filter((course) => course.isEnrolled)
              .map((course) => {
                return (
                  <Col md={6} lg={3} sm={12} key={course.id}>
                    <div className="featured-courses featured-section-title">
                      <div className="courses-img">
                        <Link href={`/dashboard/${course.id}`}>
                          <img
                            src={`${process.env.NEXT_PUBLIC_SPACES_URL}/${course.thumbnail}`}
                          />
                        </Link>

                        <p>
                          <img
                            className="w-auto mr-2"
                            src="/icons/students.svg"
                          />
                          {course.numberOfStudents} Students
                        </p>
                      </div>

                      <div style={{ marginBottom: 'auto' }}>
                        <h3>{truncate(course.name, 25)}</h3>

                        <h5
                          style={{
                            textTransform: 'capitalize',
                          }}
                        >
                          {course.type}
                        </h5>

                        <ul>
                          <li>
                            <Link href="/">
                              <img src="/icons/lessons.svg" alt="img" />
                              {course.noOfLessons} Lessons
                            </Link>
                          </li>
                          <li>
                            <Link href="/">
                              <img src="/icons/clock.svg" alt="img" />
                              {course.totalHours} Hours
                            </Link>
                          </li>
                        </ul>
                      </div>

                      <div className="button-buy">
                        {course.isAttempted ? (
                          <>
                            <Link href={`/dashboard/${course.id}`}>
                              <button>Continue</button>
                            </Link>

                            <p
                              style={{
                                color: '#989898',
                                marginTop: '20px',
                              }}
                            >
                              {truncate(course.lastWatchedCategoryName, 10)} |{' '}
                              {truncate(course.lastWatchedTutorialName, 10)}
                            </p>
                          </>
                        ) : (
                          <Link href={`/dashboard/${course.id}`}>
                            <button>Start Course</button>
                            <p
                              style={{
                                color: '#989898',
                                marginTop: '20px',
                              }}
                            ></p>
                          </Link>
                        )}
                      </div>
                    </div>
                  </Col>
                );
              })}
        </Row>

        {/* Other Courses */}
        <section className="other-course-section">
          <Row>
            <Col md={12}>
              <div className="section-heading ">
                <h2>Featured Courses</h2>
              </div>
            </Col>
          </Row>

          <Row>
            {!isLoading &&
              Object.keys(groupedCourses).map((group) => {
                return (
                  <React.Fragment key={group}>
                    <h4
                      style={{
                        textTransform: 'capitalize',
                        marginBottom: '8px',
                      }}
                    >
                      {group}
                    </h4>

                    {groupedCourses[group]
                      .filter((course) => !course.isEnrolled)
                      .map((course) => {
                        return (
                          <Col md={6} lg={3} sm={12} key={course.id}>
                            <div className="featured-courses featured-section-title">
                              <div className="courses-img">
                                <Link href={`/dashboard/${course.id}`}>
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_SPACES_URL}/${course.thumbnail}`}
                                  />
                                </Link>

                                <p>
                                  <img
                                    className="w-auto mr-2"
                                    src="/icons/students.svg"
                                  />
                                  {course.numberOfStudents} Students
                                </p>
                              </div>
                              <h3>{truncate(course.name, 25)}</h3>

                              <ul>
                                <li>
                                  <Link href="/">
                                    <img src="/icons/lessons.svg" alt="img" />
                                    {course.noOfLessons} Lessons
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/">
                                    <img src="/icons/clock.svg" alt="img" />
                                    {course.totalHours} Hours
                                  </Link>
                                </li>
                              </ul>
                              <div className="button-buy">
                                <Link href={`/plan/${course.id}/1`}>
                                  <button> Buy Now </button>
                                </Link>
                              </div>
                              <div className="free-trial-btn">
                                <Link
                                  className="free-trial"
                                  href={`/dashboard/${course.id}`}
                                >
                                  Try Free Trial
                                </Link>
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                  </React.Fragment>
                );
              })}
          </Row>
        </section>
      </Container>
    </div>
  );
}
