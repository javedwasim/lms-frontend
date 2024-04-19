'use client';

import Link from 'next/link';

import { Col, Form, Modal, Row } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';

import Header from '@/components/Auth/Header';
import Sidebar from '@/components/Dashboard/Sidebar';
import Tutorials from '@/components/Dashboard/Tutorials';
import Questions from '@/components/Dashboard/Questions';
import Calendar from '@/components/Dashboard/Calendar';

import '@/styles/DashboardSidebar.css';

import { useCourseDetails } from '@/hooks/course';
import { useAuth } from '@/hooks/auth';
import { useState } from 'react';
import { addExamDate } from '@/requests/course';
import moment from 'moment';
import { mutate } from 'swr';
import { createUserPerformanceReport } from '@/requests/performance';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

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

const getDate = () => {
  const todayDate = `${new Date().getDate()}`;
  return todayDate;
};

const getMonth = () => {
  const Month = `${new Date().getMonth()}`;
  return month[Month];
};

export default function CourseDashboard({ params }) {
  const router = useRouter();

  const { user } = useAuth({ middleware: 'auth' });

  const courseId = parseInt(params.id);

  const { data: courseDetails, isLoading } = useCourseDetails(courseId);

  const [examDate, setExamDate] = useState(null);
  const [showExamDateModal, setShowExamDateModal] = useState(false);

  const submitDate = async (e) => {
    await addExamDate(courseId, examDate);

    mutate();

    setShowExamDateModal(false);
  };

  const showPerformanceReport = async () => {
    const response = await createUserPerformanceReport(courseId);

    if (response?.reportId) {
      router.push(`/performance/${response.reportId}`);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong while generating the report.',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#251446',
        confirmButtonText: 'Close',
      });
    }
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

        {!isLoading && courseDetails && (
          <div className="hero-section">
            <Row>
              <Col md={12}>
                <div className="section-heading">
                  <div
                    className="ds-heading"
                    style={{
                      filter: !courseDetails?.is_package_purchased
                        ? 'grayscale(100%)'
                        : undefined,
                    }}
                  >
                    <h2 className="m-0">
                      <strong>{courseDetails?.name}</strong>

                      {!courseDetails?.is_package_purchased && (
                        <Link
                          href={`/plan/${courseId}/1`}
                          className="top-heading-btn"
                        >
                          <i>
                            <FaLock />
                          </i>
                          Unlock to view
                        </Link>
                      )}

                      {courseDetails?.is_package_purchased && (
                        <span
                          className="float-end"
                          onClick={() => setShowExamDateModal(true)}
                        >
                          <img src="/icons/edit.svg" alt="edit-icon" />
                          <strong>
                            {courseDetails?.exam_date
                              ? moment(courseDetails?.exam_date).fromNow(true)
                              : 0}{' '}
                          </strong>
                          until your exam
                        </span>
                      )}
                    </h2>
                  </div>
                </div>
              </Col>
            </Row>

            <div className="dashboard-section">
              <Row>
                <Tutorials courseId={courseId} />
                <Questions courseId={courseId} />

                <Col lg={4} md={5}>
                  {courseDetails?.is_package_purchased ? (
                    <>
                      <div
                        onClick={showPerformanceReport}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <div className="support-need d-flex">
                          <div
                            className="support-detail"
                            style={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                          >
                            <h3>Performance Report</h3>
                            <img src="/icons/right-arrow-2.svg" alt="icon" />
                          </div>
                        </div>
                      </div>
                      <div className="tutorials-section pt-4 pb-0">
                        <div className="d-flex mb-2">
                          <div className="date-curent">
                            <h1>
                              <span>{courseDetails?.tip && getMonth()}</span>
                              {courseDetails.tip && getDate()}
                            </h1>
                          </div>
                          <div className="tip-the-day tipmaindiv">
                            <span>Tip of the Day</span>
                            <h3>
                              {courseDetails?.tip?.tip_title
                                ? courseDetails?.tip?.tip_title
                                : 'No Tip Available Yet!'}
                            </h3>
                          </div>
                        </div>
                        <div className="weeok-plan tipmaindiv">
                          <p>{courseDetails.tip?.description}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="package-full-course">
                      <div className="title-section">
                        <h3>Unlock Full Course</h3>
                      </div>
                      <div className="detail-unlock">
                        <ul>
                          <li>
                            <img src="/icons/green-tick.png" alt="img" />
                            {courseDetails?.total_tutorials}{' '}
                            {courseDetails?.name} Videos
                          </li>
                          <li>
                            <img src="/icons/green-tick.png" alt="img" />
                            {courseDetails?.total_questions}{' '}
                            {courseDetails?.name} Questions
                          </li>
                          <li>
                            <img src="/icons/green-tick.png" alt="img" />
                            {courseDetails?.name} Revision Books
                          </li>
                          <li>
                            <img src="/icons/green-tick.png" alt="img" />
                            Live {courseDetails?.name} Webinars
                          </li>
                          <li>
                            <img src="/icons/green-tick.png" alt="img" />
                            {courseDetails?.name} Notes
                          </li>
                          <li>
                            <img src="/icons/green-tick.png" alt="img" />
                            Advanced Progress Tracking
                          </li>
                        </ul>
                        <div className="unlock-btn">
                          <Link href={`/plan/${courseId}/1`}>Unlock Now</Link>
                        </div>
                      </div>
                    </div>
                  )}

                  <a
                    href={courseDetails?.personal_support?.[0]?.support_link}
                    target="_blank"
                  >
                    <div className="support-need d-flex">
                      <div className="support-img">
                        <img src="/icons/support.svg" alt="img" />
                      </div>

                      <div className="support-detail">
                        <span className="w-100">
                          Need personalised support?
                          <img
                            className="float-end"
                            src="/icons/right-arrow-2.svg"
                            alt="icon"
                          />
                        </span>
                        <h3>
                          {courseDetails?.personal_support?.[0]?.support_title}
                        </h3>
                      </div>
                    </div>
                  </a>

                  <div className="tutorials-section">
                    <div className="heading-tutorials">
                      <h3 className="mb-0 progress-set">
                        <img src="/icons/progress.svg" alt="icon" />{' '}
                        <span>Progress</span>
                        {!courseDetails?.is_package_purchased && (
                          <Link
                            className="unlock-btn-free"
                            href={`/plan/${courseId}/1`}
                          >
                            <i>
                              <FaLock />
                            </i>
                            Unlock to view
                          </Link>
                        )}
                        <span className="float-end">
                          <Link href={`/questions/${courseId}`}>
                            <img src="/icons/right-arrow-2.svg" alt="icon" />
                          </Link>
                        </span>
                      </h3>
                    </div>

                    <center
                      className={
                        !courseDetails?.is_package_purchased
                          ? 'blur-bg'
                          : undefined
                      }
                    >
                      <div className="calendra-uni">
                        <Calendar />
                      </div>
                    </center>

                    <Row>
                      <Col md={6}>
                        <div className="date-rang-define">
                          <ul
                            className={
                              !courseDetails?.is_package_purchased
                                ? 'blur-bg'
                                : undefined
                            }
                          >
                            <li>
                              <span className="gre"></span>No{' '}
                              {courseDetails?.is_tutorial &&
                              !courseDetails?.is_questions
                                ? 'tutorials'
                                : 'questions'}{' '}
                              completed
                            </li>

                            <li>
                              <span></span>
                              Some{' '}
                              {courseDetails?.is_tutorial &&
                              !courseDetails?.is_questions
                                ? 'tutorials'
                                : 'questions'}{' '}
                              completed
                            </li>
                          </ul>
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="date-rang-define">
                          <ul
                            className={
                              !courseDetails?.is_package_purchased
                                ? 'blur-bg'
                                : undefined
                            }
                          >
                            <li>
                              <span></span>
                              Most{' '}
                              {courseDetails?.is_tutorial &&
                              !courseDetails?.is_questions
                                ? 'tutorials'
                                : 'questions'}{' '}
                              completed
                            </li>
                            <li>
                              <span className="gre-3"></span>Your Test Date
                            </li>
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>

      <Modal
        show={showExamDateModal}
        onHide={() => setShowExamDateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Exam Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="duedate">
            <Form.Control
              type="date"
              name="duedate"
              min={new Date().toISOString().slice(0, 10)}
              placeholder="Exam Date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {examDate && (
            <button className="submitbtn" onClick={(e) => submitDate(e)}>
              Submit
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
