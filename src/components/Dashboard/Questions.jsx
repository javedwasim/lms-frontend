import Link from 'next/link';

import { Col, Row, ProgressBar, Tabs, Tab } from 'react-bootstrap';

import '@/styles/DashboardSidebar.css';

import { useCourseDetails } from '@/hooks/course';

export default function Questions({ courseId }) {
  const { data: courseDetails } = useCourseDetails(courseId);

  return (
    <Col lg={4} md={6}>
      <div className="tutorials-section">
        <div className="heading-tutorials">
          <h3 className="mb-0">
            <Link href={`/questions/${courseDetails?.id}`}>
              <img src="/icons/question.svg" alt="icon" />
              Questions
              {!courseDetails.is_package_purchased && (
                <div className="unlock-btn-free">Try out sample questions</div>
              )}
              <span className="float-end">
                <img src="/icons/right-arrow.svg" alt="icon" />
              </span>
            </Link>
          </h3>
        </div>

        <div className="bbb">
          <div
            className={
              !courseDetails.is_package_purchased
                ? 'questions-attempted text-center blur-bg'
                : 'questions-attempted text-center'
            }
          >
            <p>
              <Link href={`/questions/${courseDetails?.id}`}>
                Questions Attempted
              </Link>
              <span>Scores</span>
            </p>
            <Row>
              <Col md={6} className="px-0">
                <div className="ave-score  border-right text-center">
                  <h3>
                    {courseDetails?.user_attempted_questions_count
                      ? (
                          (courseDetails?.user_correct_attempted_questions_count *
                            100) /
                          courseDetails?.user_attempted_questions_count
                        ).toFixed() + '%'
                      : '0%'}
                  </h3>
                  <p>Your Average Score</p>
                </div>
              </Col>
              <Col md={6} className="px-0">
                <div className="ave-score">
                  <h3>
                    {courseDetails && courseDetails.percentile
                      ? courseDetails.percentile.toFixed() + '%'
                      : '0%'}
                  </h3>
                  <p>Your Percentile</p>
                </div>
              </Col>
            </Row>

            <div className="your-performance-tab">
              <Tabs
                defaultActiveKey="All"
                id="uncontrolled-tab-example"
                className="mb-3 performance-tab"
              >
                <Tab eventKey="All" title="All">
                  <div className="all-section px-4 text-start">
                    <h4>Your performance</h4>
                    <div className="define-color">
                      <ul>
                        <li>
                          <span></span> Your Score
                        </li>
                        <li>
                          <span className="bg-gr"></span> MM Students Average
                          Score
                        </li>
                      </ul>
                    </div>
                    {courseDetails?.questions_by_category?.map(
                      (category, index) => (
                        <div className="score-progress" key={index}>
                          <h4>
                            {category?.category_name?.charAt(0).toUpperCase() +
                              category?.category_name?.slice(1)}
                            <span>
                              SM Average:{' '}
                              {category?.attempted_questions_count
                                ? (
                                    (category?.correct_attempted_questions_count *
                                      100) /
                                    category?.attempted_questions_count
                                  ).toFixed()
                                : 0}
                              %
                            </span>
                            <span>
                              You:{' '}
                              {category?.user_attempted_questions_count
                                ? (
                                    (category?.user_correct_attempted_questions_count *
                                      100) /
                                    category?.user_attempted_questions_count
                                  ).toFixed()
                                : 0}
                              %
                            </span>
                          </h4>
                          <ProgressBar
                            now={
                              category?.user_attempted_questions_count
                                ? (category?.user_correct_attempted_questions_count *
                                    100) /
                                  category?.user_attempted_questions_count
                                : 0
                            }
                          />
                          <ProgressBar
                            now={
                              category?.attempted_questions_count
                                ? (category?.correct_attempted_questions_count *
                                    100) /
                                  category?.attempted_questions_count
                                : 0
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                </Tab>

                {courseDetails &&
                  courseDetails.questions_by_category?.map((category, i) => (
                    <Tab
                      eventKey={category.category_name}
                      title={category.short_name}
                      key={i}
                    >
                      <div className="all-section px-5 text-start">
                        <h4>Your performance</h4>
                        <div className="define-color">
                          <ul>
                            <li>
                              <span></span> Your Score
                            </li>
                            <li>
                              <span className="bg-gr"></span> MM Students
                              Average Score
                            </li>
                          </ul>
                        </div>
                        <div className="score-progress" key={i}>
                          <h4>
                            {category.category_name?.charAt(0).toUpperCase() +
                              category.category_name?.slice(1)}
                            <span>
                              SM Average:{' '}
                              {category?.attempted_questions_count
                                ? (
                                    (category?.correct_attempted_questions_count *
                                      100) /
                                    category?.attempted_questions_count
                                  ).toFixed()
                                : 0}
                              %
                            </span>
                            <span>
                              You:{' '}
                              {category?.user_correct_attempted_questions_count
                                ? (
                                    (category?.user_correct_attempted_questions_count *
                                      100) /
                                    category?.user_attempted_questions_count
                                  ).toFixed()
                                : 0}
                              %
                            </span>
                          </h4>
                          <ProgressBar
                            now={
                              category?.attempted_questions_count
                                ? (category?.user_correct_attempted_questions_count *
                                    100) /
                                  category?.user_attempted_questions_count
                                : 0
                            }
                          />
                          <ProgressBar
                            now={
                              category?.attempted_questions_count
                                ? (category?.correct_attempted_questions_count *
                                    100) /
                                  category?.attempted_questions_count
                                : 0
                            }
                          />
                        </div>

                        <div>
                          {category?.sub_categories &&
                            category?.sub_categories.length > 0 &&
                            category?.sub_categories?.map((subcategory) => (
                              <div
                                className="score-progress"
                                key={Math.random()}
                              >
                                <h4>
                                  {subcategory?.sub_category_name
                                    ?.charAt(0)
                                    .toUpperCase() +
                                    subcategory?.sub_category_name?.slice(1)}
                                  <span>
                                    SM Avg:{' '}
                                    {subcategory?.correct_attempted_questions_count
                                      ? (
                                          (subcategory?.correct_attempted_questions_count *
                                            100) /
                                          subcategory?.attempted_questions_count
                                        ).toFixed()
                                      : 0}
                                    %
                                  </span>
                                  <span>
                                    You:{' '}
                                    {subcategory?.user_correct_attempted_questions_count
                                      ? (
                                          (subcategory?.user_correct_attempted_questions_count *
                                            100) /
                                          subcategory?.user_attempted_questions_count
                                        ).toFixed()
                                      : 0}
                                    %
                                  </span>
                                </h4>
                                <ProgressBar
                                  now={
                                    subcategory?.attempted_questions_count
                                      ? (subcategory?.user_correct_attempted_questions_count *
                                          100) /
                                        subcategory?.user_attempted_questions_count
                                      : 0
                                  }
                                />
                                <ProgressBar
                                  now={
                                    subcategory?.attempted_questions_count
                                      ? (subcategory?.correct_attempted_questions_count *
                                          100) /
                                        subcategory?.attempted_questions_count
                                      : 0
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </Tab>
                  ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}
