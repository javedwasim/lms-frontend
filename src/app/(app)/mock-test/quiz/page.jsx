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
import { Col, Modal, Row } from 'react-bootstrap';
import Draggable from 'react-draggable';
import Swal from 'sweetalert2';

import { BiArrowBack } from 'react-icons/bi';
import { BsFlagFill, BsFlag } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { MdDownloadDone, MdPreview } from 'react-icons/md';
import { AiFillClockCircle, AiOutlineClose } from 'react-icons/ai';
import { RiSave3Fill } from 'react-icons/ri';

import Timer from '@/components/Quiz/Timer';

import Type1 from '@/components/Quiz/Type1';
import Type2 from '@/components/MockTest/Type2';
import Type5 from '@/components/Quiz/Type5';

import '@/styles/DashboardSidebar.css';
import '@/styles/QuestionsStart.css';
import '@/styles/Quiz.css';

import { submitQuestionIssue } from '@/requests/quiz';

import {
  startMockTest,
  fetchMockQuestion,
  finishMockTest,
  reviewMockTestBeforeFinish,
  submitMockAnswer,
} from '@/requests/mockTest';

export default function MockQuiz() {
  const router = useRouter();

  const timed = true;

  let courseId, mockTestId, categoryId, resume, questionArray;

  if (typeof window !== 'undefined') {
    courseId = localStorage.getItem('course_id');
    mockTestId = localStorage.getItem('mocktest_id');
    categoryId = localStorage.getItem('mockcategory_id');
    resume = localStorage.getItem('mock_resume');
    questionArray = localStorage.getItem('question_array');
  }

  const [questionId, setQuestionId] = useState(null);
  const [questionResponse, setQuestionResponse] = useState(null);

  const [continueUntimed, setContinueUntimed] = useState(true); // previously buttonStatus
  const [examEnded, setExamEnded] = useState(false);

  const [flaggedQuestionId, setFlaggedQuestionId] = useState(null);
  const [incompleteQuestionId, setIncompleteQuestionId] = useState(null);

  const [reviewList, setReviewList] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [showReportIssueModal, setShowReportIssueModal] = useState(false);
  const [issueCategories, setIssueCategories] = useState([]);
  const [issueDescription, setIssueDescription] = useState('');
  const [issueEmail, setIssueEmail] = useState('');

  const [answer, setAnswer] = useState('');
  const [dragAndDropAnswer, setDragAndDropAnswer] = useState('');
  const [reviewClicked, setReviewClicked] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const startLoader = false;
  const [isLoading, setIsLoading] = useState(false);

  let currentQuestionId = questionResponse?.current_question_id;
  let prevQuestionId = questionResponse?.previous_question_id;
  let nextQuestionId = questionResponse?.next_question_id;

  const flagQuestion = () => {
    startMockTest(
      mockTestId,
      categoryId,
      questionArray,
      currentQuestionId,
      resume
    );

    setQuestionResponse((prev) => ({
      ...prev,
      is_question_reviewed: prev.is_question_reviewed == '1' ? '0' : '1',
    }));
  };

  const endExam = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You have chosen to end this exam',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#251446',
      cancelButtonColor: '#d33',
      confirmButtonText: 'End Exam',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await submitCurrentAnswer();
        await finishMockTest(mockTestId, categoryId, 0);
        window.location.href = `/mock-test/${courseId}/category/${mockTestId}`;
      }
    });
  };
  const saveAndExitExam = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You have chosen to save and exit this exam',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#251446',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save and Exit',
    }).then((result) => {
      if (result.isConfirmed) {
        submitCurrentAnswer().then(() => {
          finishMockTest(mockTestId, categoryId, 1).then(() => {
            router.push(`/mock-test/${courseId}/category/${mockTestId}`);
          });
        });
      }
    });
  };
  /*const saveAndExitExam = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You have chosen to save and exit this exam',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#251446',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save and Exit',
    }).then((result) => {
      if (result.isConfirmed) {
        submitCurrentAnswer();
        finishMockTest(mockTestId, categoryId, 1);
        // router.push(`/mock-test/${courseId}/category/${mockTestId}`);
        window.location.href = `/mock-test/${courseId}/category/${mockTestId}`;
      }
    });
  }; */

  const submitCurrentAnswer = async () => {
    const correct_option_json =
      dragAndDropAnswer?.length > 0 ? JSON.stringify(dragAndDropAnswer) : '';

    await submitMockAnswer(
      mockTestId,
      currentQuestionId,
      answer,
      correct_option_json
    );
  };

  const handleShowReview = async () => {
    setReviewClicked(true);
    await submitCurrentAnswer();

    const response = await reviewMockTestBeforeFinish(mockTestId, 39);
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

    setShowReviewModal(false);
  };

  const reviewFlaggedQuestion = () => {
    if (!flaggedQuestionId) return;

    // set the question to the first flagged question
  };

  const reviewIncompleteQuestion = () => {
    if (!incompleteQuestionId) return;

    // set the question to the first incomplete question
  };

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

    //TODO: call api to submit issue with (currentQuestionId, uniqueIssueCategories, issueDescription, issueEmail); - existing api: /report_issue
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
          }
        });
      }
    }
  };

  useEffect(() => {
    setDragAndDropAnswer('');
    setIsLoading(true);

    fetchMockQuestion(mockTestId, categoryId, questionArray, questionId)
      .then((res) => {
        setQuestionResponse(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [questionId]);

  useEffect(() => {
    if (questionResponse?.question_list?.question_selected_mock[0]?.answer) {
      setAnswer(
        questionResponse?.question_list?.question_selected_mock[0]?.answer
      );
    } else {
      setAnswer('');
    }
  }, [questionResponse]);

  if (reviewClicked) {
    return (
        <Box
            sx={{
              width: '100%',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px',
              color: '#483A64',
            }}
        >
          <CircularProgress color="inherit" />
          <p>Please wait for question review details</p>
        </Box>
    );

  }

  if (!questionResponse) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
          color: '#483A64',
        }}
      >
        <CircularProgress color="inherit" />
        <p>Please wait your exam will starting soon</p>
      </Box>
    );
  }

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
      {!isLoading  && (
        <div className="table-border">
          {questionResponse?.question_list?.question_type === 1 ? (
            <Type1
              answer={answer}
              setAnswer={setAnswer}
              questionDetails={questionResponse?.question_list}
            />

          ) : questionResponse?.question_list?.question_type === 2 ? (
            <Type2
              callbackForType2={callbackForType2}
              questionDetails={questionResponse?.question_list}
            />
          ) : (
            questionResponse?.question_list?.question_type === 5 && (
              <Type5
                answer={answer}
                setAnswer={setAnswer}
                questionDetails={questionResponse?.question_list}
              />
            )
          )}
        </div>
      )}

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
              onClick={examEnded ? handletempdata : endExam}
            >
              {examEnded ? 'Exit Exam' : 'End Exam'}
              <MdDownloadDone fontSize={20} color="white" />
            </button>
          </div>

          <div>
            {continueUntimed && examEnded === false && (
              <>
                {prevQuestionId && (
                  <button className="pre-btn" onClick={handlePrevQuestion}>
                    <BiArrowBack fontSize={20} color="white" /> Previous
                  </button>
                )}
                {nextQuestionId && !isLoading && (
                  <button className="next-btn" onClick={handleNextQuestion}>
                    Next
                    <HiOutlineArrowNarrowRight fontSize={20} color="white" />
                  </button>
                )}

                <button className="pre-btn" onClick={saveAndExitExam}>
                  Save and Exit
                  <RiSave3Fill fontSize={20} color="white" />
                </button>
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
              {reviewList?.length != 0
                ? reviewList?.map((question, i) => (
                    <Fragment key={i}>
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
