'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Accordion, Col, Row } from 'react-bootstrap';

import Header from '@/components/Auth/Header';
import Sidebar from '@/components/Dashboard/Sidebar';
import MockResultModal from '@/components/MockTest/MockResultModal';

import { useAuth } from '@/hooks/auth';
import { useMockTestCategories, useMockTestScore } from '@/hooks/mockTest';
import { fetchMockReviewAfterFinish, startMockTest } from '@/requests/mockTest';

import '@/styles/Questions.css';
import {useCourseDetails} from "@/hooks/course";
import Link from "next/link";

export default function MockTest({ params }) {
  const router = useRouter();

  const { user } = useAuth({ middleware: 'auth' });

  const courseId = parseInt(params.courseId);
  const mockTestId = parseInt(params.mockTestId);
  const { data: orderDetails } = useCourseDetails(courseId);
  const { data: mockTestCategories } = useMockTestCategories(
    courseId,
    mockTestId
  );

  const { data: mockTestScore } = useMockTestScore(courseId, mockTestId);

  const [reviewList, setReviewList] = useState(null);
  const [showScoreModal, setShowScoreModal] = useState(false);

  // function for starting the test for the selected category
  const handleSetQuestions = (mockCategory) => {
    localStorage.setItem('course_id', courseId);
    localStorage.setItem('mockcategory_id', mockCategory.category_id);
    localStorage.setItem('mocktest_id', mockCategory.mocktest_id);
    localStorage.setItem('question_array', mockCategory?.totalquestion);
    localStorage.setItem('questionIdsForReview', mockCategory?.totalquestion);
    localStorage.setItem('count_down_time_for_exam', mockCategory?.time);
    localStorage.setItem('mock_resume', mockCategory?.resume);

    startMockTest(
      mockCategory.mocktest_id,
      mockCategory.category_id,
      mockCategory?.totalquestion,
      null,
      mockCategory?.resume
    );

    router.push(`./${mockTestId}/instructions/${mockCategory?.category_id}`);
  };

  useEffect(() => {
    fetchMockReviewAfterFinish(mockTestId).then((response) => {
      setReviewList(response?.data?.data);
    });
  }, []);

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
            <Col item md={12} className="p-0">
              <div className="section-heading question-heading sec-heading mt-4">
                <h2 className="m-0">Questions</h2>
                <p className="steps-cd">Progress / Questions</p>
              </div>
            </Col>
          </Row>
          <>
            {orderDetails?.is_package_purchased ? (
                    <div className="accodon-typ">
                      {mockTestCategories &&
                          mockTestCategories.map((mockCategory, i) => (
                              <Row>
                                <Col md={8}>
                                  <div className="ques-detail">
                                    <Accordion
                                        defaultActiveKey="0"
                                        flush
                                        alwaysOpen={true}
                                        onClick={(e) => e.preventDefault()}>
                                      <Accordion.Item eventKey={1}>
                                        <Accordion.Header>
                                          <div className="all-question-att">
                                            <p className="w-100 m-0 all-questions-select moke-test-selcet ">
                                              <spa className="ddd">
                                                {mockCategory?.categoryName}
                                              </spa>
                                              <b className="spn-btn-btn">
                                                {mockCategory?.resume === 0 ? (
                                                    <span
                                                        className="start-btn-cate float-end start-case "
                                                        onClick={() =>
                                                            handleSetQuestions(mockCategory)
                                                        } >
                                                Start
                                                </span>
                                                ) : mockCategory?.resume === 2 ? (
                                                    <span
                                                        className="start-btn-cate  retake-time float-end "
                                                        onClick={() =>
                                                            handleSetQuestions(mockCategory)
                                                        } >
                                                      Re-take
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="start-btn-cate resume float-end"
                                                        onClick={() =>
                                                            handleSetQuestions(mockCategory)
                                                        }
                                                    >
                                                    Resume
                                                    </span>
                                                )}

                                                {mockCategory?.resume === 0 ? (
                                                    <>
                                                    <span
                                                        className="float-end start-time"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                      Total Q:{' '}
                                                      {mockCategory?.totalquestionCount}
                                                    </span>
                                                      <span
                                                          className="float-end start-time"
                                                          onClick={(e) => e.preventDefault()}
                                                      >
                                                        Time: {mockCategory?.time}
                                                      </span>
                                                    </>
                                                ) : mockCategory?.resume === 2 ? (
                                                    <>
                                                    <span
                                                        className="float-end retake-time retake-total"
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                      Total Q:{' '}
                                                      {mockCategory?.totalquestionCount}
                                                    </span>
                                                      <span
                                                          className="float-end retake-time"
                                                          onClick={(e) => e.preventDefault()}
                                                      >
                                                      Time: {mockCategory?.time}
                                                      </span>
                                                                  </>
                                                              ) : (
                                                                  <>
                                                      <span
                                                          className="float-end resume"
                                                          onClick={(e) => e.preventDefault()}
                                                      >
                                                      Qs. Left:{' '}
                                                      {mockCategory?.totalquestionCount}
                                                    </span>

                                                      <span
                                                          className="float-end resume"
                                                          onClick={(e) => e.preventDefault()}
                                                      >
                                                        Time Left: {mockCategory?.time}
                                                      </span>
                                                    </>
                                                )}
                                              </b>
                                            </p>
                                          </div>
                                        </Accordion.Header>
                                      </Accordion.Item>
                                    </Accordion>
                                  </div>
                                </Col>

                                <Col md={4}>
                                  <div className="your-score-cate">
                                    <span style={{ cursor: 'pointer' }}>
                                      Score:{' '}
                                      {mockTestScore?.category_data?.map(
                                          (resultCategory) => {
                                            return resultCategory?.category_id ===
                                            mockCategory?.category_id
                                                ? parseInt(
                                                    resultCategory?.your_score_in_percent
                                                ) >= 0
                                                    ? parseInt(
                                                    resultCategory?.your_score_in_percent
                                                ) + '%'
                                                    : ''
                                                : '';
                                          }
                                      )}
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                          ))}
                    </div>
                ) :
                <div className="courses-img">
                  <h2>Please unlock this course to access the Mock Test.</h2>
                </div>
            }
          </>
          <Row>
            {mockTestCategories && orderDetails?.is_package_purchased &&(
              <Col>
                <div>
                  <button
                    className="test-start-btn float-start"
                    onClick={() => setShowScoreModal(true)}
                  >
                    View Score
                  </button>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <MockResultModal
        show={showScoreModal}
        onHide={() => setShowScoreModal(false)}
        courseId={courseId}
        mockTestId={mockTestId}
        reviewList={reviewList}
      />
    </div>
  );
}
