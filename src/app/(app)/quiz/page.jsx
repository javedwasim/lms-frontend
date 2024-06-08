'use client';

import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { Col, Container, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import Draggable from 'react-draggable';
import Swal from 'sweetalert2';
import * as Sentry from '@sentry/nextjs';

import { BiArrowBack } from 'react-icons/bi';
import { BsFlagFill, BsFlag } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { MdDownloadDone, MdPreview } from 'react-icons/md';
import { AiFillClockCircle, AiOutlineClose } from 'react-icons/ai';

import Timer from '@/components/Quiz/Timer';

import Type1 from '@/components/Quiz/Type1';
import Type2 from '@/components/Quiz/Type2';
import Type5 from '@/components/Quiz/Type5';

import '@/styles/DashboardSidebar.css';
import '@/styles/QuestionsStart.css';
import '@/styles/Quiz.css';

import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// API which is called when test has started, fetches the data about question
import { useAuth } from '@/hooks/auth';
import { useQuizQuestion } from '@/hooks/quiz';

import {
  addQuestionForReview,
  deleteQuiz,
  fetchScoreAfterFinish,
  finishTest,
  reviewTestAfterFinish,
  reviewTestBeforeFinish,
  submitAnswer,
  submitQuestionIssue,
} from '@/requests/quiz';

export default function Quiz() {
  const router = useRouter();

  const { user } = useAuth({ middleware: 'auth' });

  let timed, firstQuestionId;

  if (typeof window !== 'undefined') {
    timed = localStorage.getItem('timed') === 'true';
    firstQuestionId = localStorage.getItem('firstQuestionId');
  }

  const [questionId, setQuestionId] = useState(firstQuestionId);
  
  const { data: questionResponse, mutate } = useQuizQuestion(questionId);

  const [continueUntimed, setContinueUntimed] = useState(true); // previously buttonStatus
  const [examEnded, setExamEnded] = useState(false);

  const [flaggedQuestionId, setFlaggedQuestionId] = useState(null);
  const [incompleteQuestionId, setIncompleteQuestionId] = useState(null);

  const [reviewList, setReviewList] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [scoreData, setScoreData] = useState(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);
  
  const chartoption = {
    chart: {
      type: 'bar',
      stackType: '100%',
      height: 350,
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: scoreData?.category_data
        ? scoreData.category_data.map((val, i) => {
            return val.category_name;
          })
        : [],
      labels: {
        style: {
          fontSize: '15px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      labels: {
        formatter: function (value) {
          return value?.toFixed() + '%';
        },

        style: {
          fontSize: '15px',
        },
      },
    },

    fill: {
      opacity: 1,
    },
  };

  const chartseries = [
    {
      name: 'Your Scores',
      data: scoreData?.category_data
        ? scoreData.category_data.map((val, i) => {
            return val.your_score_in_percent;
          })
        : [],
    },
    {
      name: 'Other Users',
      data: scoreData?.category_data
        ? scoreData.category_data.map((val, i) => {
            return val.avg_of_all_users;
          })
        : [],
    },
  ];

  const [showReportIssueModal, setShowReportIssueModal] = useState(false);
  const [issueCategories, setIssueCategories] = useState([]);
  const [issueDescription, setIssueDescription] = useState('');
  const [issueEmail, setIssueEmail] = useState('');

  const [answer, setAnswer] = useState('');
  const [dragAndDropAnswer, setDragAndDropAnswer] = useState('');

  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = !questionResponse || isSubmitting;
  const [reviewClicked, setReviewClicked] = useState(false);

  let currentQuestionId = questionResponse?.current_question_id;
  let prevQuestionId = questionResponse?.previous_question_id;
  let nextQuestionId = questionResponse?.next_question_id;

  const flagQuestion = () => {
    addQuestionForReview(currentQuestionId);

    mutate({
      ...questionResponse,
      is_question_reviewed:
        questionResponse.is_question_reviewed == '1' ? '0' : '1',
    });
  };

  const endExam = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You have chosen to end this exam',
      icon: 'warning',

      confirmButtonColor: '#251446',
      confirmButtonText: 'End Exam',

      showCancelButton: true,
      cancelButtonColor: '#d33',

      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const courseId = localStorage.getItem('courseId');

          await submitCurrentAnswer();
          await finishTest(courseId);

          const reviewAfterFinish = await reviewTestAfterFinish();
          setReviewList(reviewAfterFinish.review_list);

          const scoreAfterFinish = await fetchScoreAfterFinish(courseId);
          setScoreData(scoreAfterFinish);

          setShowScoreModal(true);
          return true;
        } catch (error) {
          Sentry.captureException(error);
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        setExamEnded(true);
      }
    });
  };

  const exitExam = async () => {
    await deleteQuiz();

    const courseId = localStorage.getItem('courseId');
    router.push(`/dashboard/${courseId}`);
  };

  const submitCurrentAnswer = async () => {
    setIsSubmitting(true);

    const correct_option_json =
      dragAndDropAnswer?.length > 0 ? JSON.stringify(dragAndDropAnswer) : '';

    await submitAnswer(currentQuestionId, answer, correct_option_json);

    mutate({
      ...questionResponse,
      question_details: {
        ...questionResponse.question_details,
        selected_answer: { answer, correct_option_json: dragAndDropAnswer },
      },
    });

    setAnswer('');
    setDragAndDropAnswer('');

    setIsSubmitting(false);
  };

  const handleShowReview = async () => {
    setReviewClicked(true);
    if (currentQuestionId) {
      submitAnswer(currentQuestionId, answer);
    }

    const response = await reviewTestBeforeFinish();
    setReviewList(response?.review_list);

    setShowReviewModal(true);
    setReviewClicked(false);
  };

  const handlePrevQuestion = async (e) => {
    e.preventDefault();

    await submitCurrentAnswer();

    setQuestionId(prevQuestionId);
  };

  const handleNextQuestion = async (e) => {
    e.preventDefault();

    await submitCurrentAnswer();

    setQuestionId(nextQuestionId);
  };

  const getQuestionFromReview = (e, question) => {
    setQuestionId(question.question_id);
    setAnswer('');
    setShowReviewModal(false);
  };

  const getQuestionExplanation = (e, question) => {
    localStorage.setItem('questionIdForReview', question.question_id);
    window.open(`/explanation`, '_blank');
  };

  
  const reviewFlaggedQuestion = () => {
    setShowFlaggedOnly(true);
    setShowIncompleteOnly(false); // Ensure only one filter is applied at a time
  };

  const reviewIncompleteQuestion = () => {
    setShowIncompleteOnly(true);
    setShowFlaggedOnly(false); // Ensure only one filter is applied at a time
  };


  const filteredReviewList = showFlaggedOnly
      ? reviewList.filter((question) => question.check_already_review === 1)
      : showIncompleteOnly
          ? reviewList.filter((question) => question.que_status !== 'Complete')
          : reviewList;

  const handleIssueCategoryChange = (e, key, value) => {
    setIssueCategories((prev) => [...prev, { key, value }]);
  };

  const submitIssue = () => {
    const uniqueIssueCategories = issueCategories.reduce((arr, category) => {
      if (!arr.some((obj) => obj.value === category.value)) {
        arr.push(category);
      }
      return arr;
    }, []);

    // //TODO: call api to submit issue with (currentQuestionId, uniqueIssueCategories, issueDescription, issueEmail); - existing api: /report_issue
    submitQuestionIssue(
      currentQuestionId,
      issueDescription,
      issueEmail,
      uniqueIssueCategories
    );

    setIssueEmail('');
    setIssueDescription('');
    setIssueCategories([]);

    setShowReportIssueModal(false);
  };

  const callbackForType2 = (dragAndDropAnswers, selectedAnswer) => {
    if (dragAndDropAnswers.length !== 0 && selectedAnswer.length !== 0) {
      let filteredSelectedAnswers = selectedAnswer.filter((val, i) => {
        return !dragAndDropAnswers.some((val1, i1) => {
          return val.option_id === val1.option_id;
        });
      });

      let finalMatch = [...filteredSelectedAnswers, ...dragAndDropAnswers];
      setDragAndDropAnswer(finalMatch);
    }

    if (dragAndDropAnswers && selectedAnswer.length === 0) {
      setDragAndDropAnswer(dragAndDropAnswers);
    }

    if (dragAndDropAnswers.length === 0 && selectedAnswer) {
      setDragAndDropAnswer(selectedAnswer);
    }

    setAnswer('');
  };

  const [timerAlert, setTimerAlert] = useState(true);

  const timerCallback = (hours, minutes, seconds) => {
    if (showScoreModal === false) {
      if (hours == '00' && minutes == '00' && seconds == '00') {
        if (timerAlert == true) {
          Swal.fire({
            title: 'Time Expired',
            text: "You won't be able to revert this!",
            icon: 'warning',

            showCancelButton: true,

            confirmButtonColor: '#251446',
            cancelButtonColor: '#d33',

            confirmButtonText: 'Continue Untimed',
            cancelButtonText: 'View Results',
          }).then((result) => {
            if (result.isConfirmed) {
              setContinueUntimed(true);
              setTimerAlert(false);
            }
            if (result.isDismissed) {
              setContinueUntimed(false);
              setTimerAlert(false);
              setExamEnded(true);
              endExam();
            }
          });
        }
      }
    }
  };

  let performedData =
    Math.floor(scoreData?.your_score) -
    Math.floor(scoreData?.avg_score_of_all_users);

  useEffect(() => {
    if (questionResponse?.question_details?.question_selected?.answer) {
      setAnswer(questionResponse?.question_details?.question_selected?.answer);
    }
  }, [questionResponse]);

  return (
    <>
      <div
        style={{
          width: '100%',
          padding: '10px 10px 10px 14px',
          backgroundColor: '#251446',
          zIndex: '999',
          color: 'white',
          display: 'flex',
          top: '0',
          position: 'fixed',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h5>Question Bank</h5>
        </div>

        <div className="side-header text-end">
          {timed && (
            <>
              <div className="ques-timeing">
                <AiFillClockCircle />
                <Timer timed={timed} timerCallback={timerCallback} />
              </div>
            </>
          )}
          {questionResponse?.serial_no} of {questionResponse?.total_question}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          padding: '16px 10px',
          zIndex: '999',
          position: 'fixed',
          top: '52px',
          backgroundColor: '#483a64',
          color: 'white',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        className={timed ? 'top-cal' : undefined}
      >
        <div>
          {isCalculatorOpen ? (
            <button
              className="pre-btn"
              onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
            >
              Close Calculator
            </button>
          ) : (
            <button
              className="pre-btn"
              onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
            >
              Calculator
            </button>
          )}
        </div>

        <div style={{ display: 'flex' }}>
          <span className="p-0 mr-5" style={{ marginRight: '20px' }}>
            {currentQuestionId && 'Q ID: ' + currentQuestionId}
          </span>
          <p
            className="p-0 ml-5 flag-for-review"
            onClick={flagQuestion}
            style={{ cursor: 'pointer' }}
          >
            {questionResponse?.is_question_reviewed === '1' ? (
              <span className="reviewed ml-5">
                <BsFlagFill color="yellow" /> Flag For Review
              </span>
            ) : (
              <span className=" ml-5">
                <BsFlag /> Flag For Review
              </span>
            )}
          </p>

          <p className="m-0">
            <span
              className="flag-for-review report-issue-btn"
              onClick={() => setShowReportIssueModal(true)}
              style={{ cursor: 'pointer' }}
            >
              Report Issue
            </span>
          </p>
        </div>
      </div>

      <div className="table-border">
        {isLoading || reviewClicked ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              paddingTop: '250px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : questionResponse?.question_details.question_type === 1 ? (
          <Type1
            answer={answer}
            setAnswer={setAnswer}
            questionDetails={questionResponse.question_details}
          />
        ) : questionResponse?.question_details.question_type === 2 ? (
          <Type2
            callbackForType2={callbackForType2}
            questionDetails={questionResponse.question_details}
          />
        ) : (
          questionResponse?.question_details.question_type === 5 && (
            <Type5
              answer={answer}
              setAnswer={setAnswer}
              questionDetails={questionResponse.question_details}
            />
          )
        )}
      </div>

      <footer>
        {isCalculatorOpen && (
          <Draggable>
            <div
              className="backr"
              style={{ height: '100%', width: '250px', cursor: 'move' }}
            >
              <center>
                <span>Drag Here To Move Calculator</span>
              </center>
              <button
                className="cal-cros-bnt"
                onClick={() => setIsCalculatorOpen(false)}
                style={{ zIndex: '99999' }}
              >
                <AiOutlineClose color="white" fontSize={20} />
              </button>
              <center>
                <iframe
                  src="https://www.medicmind.co.uk/tools/calculator.html"
                  style={{ height: '460px', width: '292px', zIndex: '3' }}
                  title="Iframe Example"
                ></iframe>
              </center>
            </div>
          </Draggable>
        )}

        <div
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#251446',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <button
              className="pre-btn"
              onClick={examEnded ? exitExam : endExam}
              disabled={isLoading}
            >
              {examEnded ? 'Exit Exam' : 'End Exam'}
              <MdDownloadDone fontSize={20} color="white" />
            </button>

            <button
              className="pre-btn"
              onClick={handleShowReview}
              disabled={isLoading}
            >
              Review <MdPreview fontSize={20} color="white" />
            </button>
          </div>

          <div>
            {continueUntimed && examEnded === false && (
              <>
                {prevQuestionId && (
                  <button
                    className="pre-btn"
                    onClick={handlePrevQuestion}
                    disabled={isLoading}
                  >
                    <BiArrowBack fontSize={20} color="white" /> Previous
                  </button>
                )}

                {nextQuestionId ? (
                  <button
                    className="next-btn"
                    onClick={handleNextQuestion}
                    disabled={isLoading}
                  >
                    Next
                    <HiOutlineArrowNarrowRight fontSize={20} color="white" />
                  </button>
                ) : (
                  <button
                    className="pre-btn"
                    onClick={endExam}
                    disabled={isLoading}
                  >
                    Submit Exam
                    <MdDownloadDone fontSize={20} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </footer>

      {/* Review Screen */}
      <Modal
        show={showReviewModal}
        className="review-modal-ful"
        onHide={() => setShowReviewModal(false)}
      >
        <Modal.Header closeButton />

        <Modal.Body>
          <div>
            <Modal.Title className="mb-3">Instructions</Modal.Title>
          </div>

          <div className="instruction">
            <p>
              Below is a summary of your answers. You can review your questions
              in three (3) different ways.
            </p>

            <p>
              The buttons in the lower right-hand corner correspond to these
              choices:
            </p>

            <p>1. Review all of your questions and answers.</p>
            <p>2. Review questions that are incomplete. </p>
            <p className="mb-4">
              3. Review questions that are flagged for review. (Click the 'flag'
              icon to change the flag for review status.) You may also click on
              a question number to link directly to its location in the exam.
            </p>
          </div>

          <div className="instruction_heading">
            <Modal.Title>Section</Modal.Title>
          </div>
          <div className="question_list">
            <br />
            <Row>
              {filteredReviewList?.length !== 0
                  ? filteredReviewList.map((question, i) => (
                      <Fragment key={question.question_id}>
                        <Col md={4}>
                          <div
                              className="review-modal-box"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                padding: '3px 10px',
                                margin: '0 0 10px',
                                border: '1px solid #adadad',
                                alignItems: 'center',
                              }}
                              onClick={(e) => getQuestionFromReview(e, question)}
                          >
                            Question {i + 1}
                            {question?.check_already_review === 1 && (
                                <div
                                    style={{
                                      backgroundColor: 'yellow',
                                      color: 'white',
                                      height: '30px',
                                      padding: '4px 10px',
                                      borderRadius: '20px',
                                      textAlign: 'center',
                                      display: 'flex',
                                      marginTop: '2px',
                                      marginBottom: '2px',
                                    }}
                                >
                                  <h6
                                      className="status-que"
                                      style={{ color: 'black' }}
                                  >
                                    Flagged
                                  </h6>
                                </div>
                            )}
                            <div
                                style={{
                                  backgroundColor: question?.que_status_color,
                                  height: '30px',
                                  padding: '4px 10px',
                                  borderRadius: '20px',
                                  textAlign: 'center',
                                  display: 'flex',
                                  marginTop: '2px',
                                  marginBottom: '2px',
                                }}
                            >
                              {question.que_status === 'Complete' ? (
                                  <h6
                                      className="status-que"
                                      style={{ color: 'white' }}
                                  >
                                    {question.que_status}
                                  </h6>
                              ) : (
                                  <h6 className="status-que">
                                    {question.que_status}
                                  </h6>
                              )}
                            </div>
                          </div>
                        </Col>
                        <br />
                      </Fragment>
                  ))
                  : 'No Questions'}
            </Row>
          </div>

          <div className="question_list">
            <br />
            <Row>
              {reviewList?.length != 0
                ? reviewList?.map((question, i) => (
                    <Fragment key={question.question_id}>
                      <Col md={4}>
                        <div
                          className="review-modal-box"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            padding: '3px 10px',
                            margin: '0 0 10px',
                            border: '1px solid #adadad',
                            alignItems: 'center',
                          }}
                          onClick={(e) => getQuestionFromReview(e, question)}
                        >
                          Question {i + 1}
                          {question?.check_already_review === 1 && (
                            <div
                              style={{
                                backgroundColor: 'yellow',
                                color: 'white',
                                height: '30px',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                textAlign: 'center',
                                display: 'flex',
                                marginTop: '2px',
                                marginBottom: '2px',
                              }}
                            >
                              <h6
                                className="status-que"
                                style={{ color: 'black' }}
                              >
                                Flagged
                              </h6>
                            </div>
                          )}
                          <div
                            style={{
                              backgroundColor: question?.que_status_color,
                              height: '30px',
                              padding: '4px 10px',
                              borderRadius: '20px',
                              textAlign: 'center',
                              display: 'flex',
                              marginTop: '2px',
                              marginBottom: '2px',
                            }}
                          >
                            {question.que_status === 'Complete' ? (
                              <h6
                                className="status-que"
                                style={{ color: 'white' }}
                              >
                                {question.que_status}
                              </h6>
                            ) : (
                              <h6 className="status-que">
                                {question.que_status}
                              </h6>
                            )}
                          </div>
                        </div>
                      </Col>
                      <br />
                    </Fragment>
                  ))
                : 'No Questions'}
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal-footer-review">
          <button className="pre-btn mx-2" onClick={reviewFlaggedQuestion}>
            Review Flagged
          </button>

          <button className="pre-btn mx-2" onClick={reviewIncompleteQuestion}>
            Review Incomplete
          </button>

          {examEnded === false && (
            <button className="pre-btn mx-2" onClick={endExam}>
              End Exam
            </button>
          )}
        </Modal.Footer>
      </Modal>

      {/* For Score Modal */}
      <Modal
        className="resultmodal"
        show={showScoreModal}
        fullscreen={'xxl-down'}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Final Score
          </Modal.Title>
          <div className="start-test-btn mt-0">
            <button className="exit_btn total-ques-select" onClick={exitExam}>
              Exit
            </button>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="tab-review-modal">
            <Tabs
              defaultActiveKey="home"
              transition={true}
              id="noanim-tab-example"
              className="mb-3 p-0 "
            >
              <Tab eventKey="home" title="Your Score">
                <div>
                  <center>
                    <div className="header">
                      <h4>
                        Your Score:{' '}
                        {scoreData?.your_score > 0
                          ? Math.floor(scoreData?.your_score) + '%'
                          : '0%'}
                      </h4>
                      <h4>
                        Average Score of All Users:{' '}
                        {scoreData?.avg_score_of_all_users
                          ? Math.floor(scoreData?.avg_score_of_all_users) + '%'
                          : '0%'}
                      </h4>
                      <h4>
                        <i>
                          {performedData > 0 ? (
                            <i style={{ color: 'green' }}>
                              You performed {performedData}% above average
                            </i>
                          ) : (
                            <i style={{ color: 'red' }}>
                              You performed {Math.abs(performedData)}% under
                              average
                            </i>
                          )}
                        </i>
                      </h4>
                    </div>
                  </center>

                  <br />
                  <br />

                  <div>
                    <center>
                      <h3 className="mb-4">
                        <b>Section Breakdown</b>
                      </h3>
                    </center>

                    <div className="tables data-result-table">
                      <center>
                        <table>
                          <thead>
                            <tr className="tableheader">
                              <th>Category</th>
                              <th>Your Score</th>
                              <th>Average of all Users</th>
                              <th>Total Correct</th>
                              <th>Total Incorrect</th>
                              <th>Your Percentile</th>
                              <th>Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {scoreData?.category_data?.length > 0
                              ? scoreData?.category_data?.map((val, i) => (
                                  <tr key={Math.random()}>
                                    <td>{val?.category_name}</td>
                                    <td>
                                      {val?.my_total_correct_questions + '%'}
                                    </td>
                                    <td>{val?.avg_of_all_users + '%'}</td>
                                    <td>{val?.correct}</td>
                                    <td>{val?.incorrect}</td>
                                    <td>{val?.your_score_in_percentile}</td>
                                    <td>{val?.ucat_score}</td>
                                  </tr>
                                ))
                              : ''}
                          </tbody>
                        </table>
                      </center>
                      <center>
                        <div
                          style={{
                            marginTop: '50px',
                            maxWidth: '1000px',
                            minHeight: '500px',
                            minWidth: '500px',
                            margin: '35 auto',
                            opacity: '0.9',
                          }}
                        >
                          <Chart
                            options={chartoption}
                            series={chartseries}
                            type="bar"
                          />
                        </div>
                      </center>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="profile" title="Question Review">
                <div className="question_list">
                  <Container>
                    <div className="review-quest">
                      <h2>Final Answer Review Screen</h2>
                      <p>
                        This review section enables you to view the answers you
                        gave and see whether they were correct or not. Click on
                        a question to view the explanation and comments from
                        fellow students
                      </p>
                    </div>
                  </Container>
                  <br />
                  <Row>
                    {reviewList?.length != 0
                      ? reviewList?.map((question, i) => (
                          <Fragment key={question.question_id}>
                            <Col md={4}>
                              <div
                                className="review-modal-box"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  cursor: 'pointer',
                                  padding: '3px 10px',
                                  margin: '0 0 10px',
                                  border: '1px solid #adadad',
                                  alignItems: 'center',
                                }}
                                onClick={(e) =>
                                  getQuestionExplanation(e, question)
                                }
                              >
                                Question {i + 1}
                                {question?.check_already_review === 1 && (
                                  <div
                                    style={{
                                      backgroundColor: 'yellow',
                                      color: 'white',
                                      height: '30px',
                                      padding: '4px 10px',
                                      borderRadius: '20px',
                                      textAlign: 'center',
                                      display: 'flex',
                                      marginTop: '2px',
                                      marginBottom: '2px',
                                    }}
                                  >
                                    <h6
                                      className="status-que"
                                      style={{ color: 'black' }}
                                    >
                                      Flagged
                                    </h6>
                                  </div>
                                )}
                                {question.que_status == 'Correct' ? (
                                  <div
                                    style={{
                                      backgroundColor:
                                        question?.que_status_color,
                                      color: 'white',
                                      height: '30px',
                                      padding: '4px 10px',
                                      borderRadius: '20px',
                                      textAlign: 'center',
                                      display: 'flex',
                                      marginTop: '2px',
                                      marginBottom: '2px',
                                    }}
                                  >
                                    <h6 className="status-que">
                                      {question.que_status}
                                    </h6>
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      backgroundColor:
                                        question?.que_status_color,
                                      color: 'black',
                                      height: '30px',
                                      padding: '4px 10px',
                                      borderRadius: '20px',
                                      textAlign: 'center',
                                      display: 'flex',
                                      marginTop: '2px',
                                      marginBottom: '2px',
                                    }}
                                  >
                                    <h6 className="status-que">
                                      {question.que_status}
                                    </h6>
                                  </div>
                                )}
                              </div>
                            </Col>
                            <br />
                          </Fragment>
                        ))
                      : 'No Questions'}
                  </Row>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
      </Modal>

      <div className="main-instruction">
        <Modal
          show={showReportIssueModal}
          onHide={() => setShowReportIssueModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal-addination-btn"
        >
          <Modal.Body>
            <div className="addination-heading">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) =>
                        handleIssueCategoryChange(
                          e,
                          1,
                          'Something not working properly'
                        )
                      }
                    />
                  }
                  label="Something not working properly"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) =>
                        handleIssueCategoryChange(e, 2, 'Mistake in Stem')
                      }
                    />
                  }
                  label="Mistake in Stem"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) =>
                        handleIssueCategoryChange(e, 3, 'Mistake in Question')
                      }
                    />
                  }
                  label="Mistake in Question"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) =>
                        handleIssueCategoryChange(e, 4, 'Mistake in Answers')
                      }
                    />
                  }
                  label="Mistake in Answers"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) =>
                        handleIssueCategoryChange(
                          e,
                          5,
                          'Right answer marked as wrong'
                        )
                      }
                    />
                  }
                  label="Right answer marked as wrong"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) =>
                        handleIssueCategoryChange(
                          e,
                          6,
                          'Mistake in Explanation'
                        )
                      }
                    />
                  }
                  label="Mistake in Explanation"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => handleIssueCategoryChange(e, 7, 'Other')}
                    />
                  }
                  label="Other"
                />
              </FormGroup>
            </div>

            <div>
              <textarea
                className="report-input"
                id="w3review"
                name="description"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                rows="4"
                cols="30"
                style={{ width: '100%' }}
                description="Describe The Final Issue"
              />

              <input
                className="report-input"
                type="email"
                value={issueEmail}
                onChange={(e) => setIssueEmail(e.target.value)}
                placeholder="Your E-mail"
                name="email"
                style={{ width: '100%' }}
              />
              <span className="p-0 mr-5" style={{ marginRight: '20px' }}>
                You are reporting:{' '}
                <b>{currentQuestionId ? 'Q ID: ' + currentQuestionId : ''}</b>
              </span>

              <button className="send-btn send-report" onClick={submitIssue}>
                Send
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
