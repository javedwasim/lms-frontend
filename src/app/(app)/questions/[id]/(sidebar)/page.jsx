'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isEqual } from 'lodash';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
} from '@mui/material';

import { Accordion, ProgressBar, Row, Col } from 'react-bootstrap';
import { HiPlusCircle, HiMinusCircle } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';

import '@/styles/Questions.css';

import {
  fetchQuizQuestions,
  fetchSmartStudyQuestions,
} from '@/requests/question';

import { useAuth } from '@/hooks/auth';
import { useCourseDetails } from '@/hooks/course';
import { useCourseQuestions } from '@/hooks/questions';
import { deleteQuiz } from '@/requests/quiz';
import axios from "axios";

export default function QuestionsPage({ params }) {
  const id = parseInt(params.id);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAuth({ middleware: 'auth' });

  const [questionsFilter, setQuestionsFilter] = useState('all');
  const [quizNote, setQuizNote] = useState('');

  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(0);
  const [maxQuestionsCount, setMaxQuestionsCount] = useState(0);

  const { data: courseDetails } = useCourseDetails(id);
  const { data: groupedQuestions, isLoading } = useCourseQuestions(
    id,
    questionsFilter
  );

  const [questionsCount, setQuestionsCount] = useState(null);

  const handleReset = () => {
    setSelectedSubcategories([]);
    setMaxQuestionsCount(0);
  };

  const handleStart = async () => {
    await deleteQuiz();

    const response = await fetchQuizQuestions(
      id,
      selectedSubcategories,
      selectedQuestionsCount,
      questionsFilter
    );

    localStorage.setItem('firstQuestionId', response.selectedQuestionIds[0]);
    localStorage.setItem('questionIdsForReview', response.selectedQuestionIds);
    localStorage.setItem('courseId', id);

    router.push(`${pathname}/start`);
  };

  const fetchQuestionNote = async () => {
    try {
      const response = await axios.get(
          `${baseUrl}/api/question_notes/${id}`
      );
      const newData = response.data;
      console.log(newData);
      setQuizNote(newData.quize_note);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchQuestionNote(); // Fetching quiz note when component mounts
  }, []);


  const handleSmartStudy = async () => {
    const response = await fetchSmartStudyQuestions(id);

    localStorage.setItem('firstQuestionId', response[0]);
    localStorage.setItem('questionIdsForReview', response);
    localStorage.setItem('courseId', id);

    router.push(`${pathname}/start`);
  };

  const handleSelectAllQuestions = (e) => {
    if (e.target.checked === true) {
      const categories = groupedQuestions.categories_detail;

      let subcategories = categories.map((category) => category.sub_categories);
      subcategories = subcategories.flat();

      const subcategoryIds = subcategories.map((subcategory) => subcategory.id);

      const questionsCount = subcategories.reduce(
        (acc, subcategory) => acc + subcategory.questions_count,
        0
      );

      setMaxQuestionsCount(questionsCount);
      setSelectedSubcategories(subcategoryIds);
    } else {
      setMaxQuestionsCount(0);
      setSelectedSubcategories([]);
    }
  };

  const handleSelectCategory = (e, category) => {
    const subcategoryIds = category.sub_categories.map(
      (subcategory) => subcategory.id
    );

    let questionsCount = 0;

    if (e.target.checked) {
      questionsCount = category.sub_categories
        .filter(
          (subcategory) => !selectedSubcategories.includes(subcategory.id)
        )
        .reduce((acc, subcategory) => acc + subcategory.questions_count, 0);
    } else {
      questionsCount = category.sub_categories.reduce(
        (acc, subcategory) => acc + subcategory.questions_count,
        0
      );
    }

    if (e.target.checked) {
      setMaxQuestionsCount((prev) => prev + questionsCount);
      setSelectedSubcategories((prev) => [...prev, ...subcategoryIds]);
    } else {
      setMaxQuestionsCount((prev) => prev - questionsCount);
      setSelectedSubcategories((prev) =>
        prev.filter((id) => !subcategoryIds.includes(id))
      );
    }
  };

  const handleSelectSubcategory = (e, subcategory) => {
    const subcategoryId = subcategory.id;
    const questionsCount = subcategory.questions_count;

    if (e.target.checked === true) {
      setMaxQuestionsCount((prev) => prev + questionsCount);
      setSelectedSubcategories((prev) => [...prev, subcategoryId]);
    } else {
      setMaxQuestionsCount((prev) => prev - questionsCount);
      setSelectedSubcategories((prev) =>
        prev.filter((id) => id !== subcategoryId)
      );
    }
  };

  const checkAllQuestionsSelected = useMemo(() => {
    if (!groupedQuestions) return false;

    const categories = groupedQuestions.categories_detail;

    let subcategories = categories.map((category) => category.sub_categories);
    subcategories = subcategories.flat();

    const subcategoryIds = subcategories.map((subcategory) => subcategory.id);

    return isEqual(selectedSubcategories, subcategoryIds);
  }, [selectedSubcategories]);

  const checkAllCategoryQuestionsSelected = (category) => {
    const subcategoryIds = category.sub_categories.map(
      (subcategory) => subcategory.id
    );

    return subcategoryIds.every((id) => selectedSubcategories.includes(id));
  };

  const checkAllSubcategoryQuestionsSelected = (subcategory) => {
    return selectedSubcategories.includes(subcategory.id);
  };

  useEffect(() => {
    setSelectedQuestionsCount(maxQuestionsCount);
  }, [maxQuestionsCount]);

  useEffect(() => {
    const totalQuestions = groupedQuestions?.categories_detail?.reduce(
      (acc, category) => acc + category.questions_count,
      0
    );
    const totalAttemptedQuestions = groupedQuestions?.categories_detail?.reduce(
      (acc, category) => acc + category.attempted_questions_count,
      0
    );
    const totalCorrectAttemptedQuestions =
      groupedQuestions?.categories_detail?.reduce(
        (acc, category) => acc + category.correct_attempted_questions_count,
        0
      );
    setQuestionsCount({
      totalQuestions,
      totalAttemptedQuestions,
      totalCorrectAttemptedQuestions,
    });
  }, [groupedQuestions]);

  return (
    <div className="hero-section">
      {!isLoading && (
        <>
          <Row>
            <Col md={12} className="p-0">
              <div className="section-heading question-heading sec-heading mt-4">
                <h2 className="m-0">Questions</h2>
                <p className="steps-cd">
                  <Link href={`/dashboard/${id}`}>Progress</Link> / Questions
                </p>
              </div>

              <div className="smart-study" onClick={handleSmartStudy}>
                <h3>
                  <img
                    className="head-img"
                    src="/icons/brain-icon.png"
                    alt="icon"
                  />{' '}
                  Smart Study
                  <img
                    className="white-logo"
                    src="/images/by-study-mind.png"
                    alt="icon"
                    style={{ marginLeft: '6px' }}
                  />
                </h3>
                <p>
                  Let us select your weakest areas to better
                  <br />
                  target your exam prep
                  <span>
                    <button onClick={handleSmartStudy}>TRY</button>
                  </span>
                </p>
              </div>
              {!courseDetails?.is_package_purchased && (
                <Col md={4}>
                  <div className="package-full-course free-unlock">
                    <div className="title-section">
                      <h3>Unlock Full Course</h3>
                    </div>
                    <div className="detail-unlock">
                      <ul>
                        <li>
                          <img src="/icons/green-tick.png" alt="img" />
                          {courseDetails?.total_tutorials} {courseDetails?.name}{' '}
                          Videos
                        </li>
                        <li>
                          <img src="/icons/green-tick.png" alt="img" />
                          {courseDetails?.total_questions} {courseDetails?.name}{' '}
                          Questions
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
                        <Link href={`/plan/${id}/1`}>Unlock Now</Link>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Col>
          </Row>

          <div className="ques-categories">
            <p>Which categories would you like to cover?</p>

            <FormControl>
              <RadioGroup
                value={questionsFilter}
                onChange={(e) => {
                  setQuestionsFilter(e.target.value);
                  setMaxQuestionsCount(0);
                  setSelectedSubcategories([]);
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <FormControlLabel
                  value="all"
                  control={
                    <Radio
                      sx={{
                        color: '#251446',
                        '&.Mui-checked': {
                          color: '#251446',
                        },
                      }}
                    />
                  }
                  label="All questions"
                />
                <FormControlLabel
                  value="newAndIncorrect"
                  control={
                    <Radio
                      sx={{
                        color: '#251446',
                        '&.Mui-checked': {
                          color: '#251446',
                        },
                      }}
                    />
                  }
                  label="New questions and previously incorrect"
                />
                <FormControlLabel
                  value="new"
                  control={
                    <Radio
                      sx={{
                        color: '#251446',
                        '&.Mui-checked': {
                          color: '#251446',
                        },
                      }}
                    />
                  }
                  label="New questions"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="accodon-typ">
            <Row>
              <Col lg={6}>
                <div className="ques-detail">
                  <Accordion defaultActiveKey="0" flush>
                    <div className="all-question-att border_tot_all">
                      <div className="ques-secton-pro">
                        <ProgressBar>
                          <ProgressBar
                            className="progress-color-green"
                            now={
                              questionsCount?.totalQuestions
                                ? (questionsCount?.totalCorrectAttemptedQuestions /
                                    questionsCount?.totalQuestions) *
                                  100
                                : 0
                            }
                            key={1}
                          />
                          <ProgressBar
                            className="progress-color-red"
                            now={
                              questionsCount?.totalQuestions
                                ? ((questionsCount?.totalAttemptedQuestions -
                                    questionsCount?.totalCorrectAttemptedQuestions) /
                                    questionsCount?.totalQuestions) *
                                  100
                                : 0
                            }
                            key={2}
                          />
                        </ProgressBar>
                      </div>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkAllQuestionsSelected}
                            onChange={(e) => handleSelectAllQuestions(e)}
                          />
                        }
                      />
                      <p className="w-100 m-0 all-questions-select">
                        All
                        <span className="float-end">
                          Attempted {questionsCount?.totalAttemptedQuestions} of{' '}
                          {questionsCount?.totalQuestions}
                        </span>
                      </p>
                    </div>

                    {groupedQuestions?.categories_detail?.length > 0 &&
                      groupedQuestions.categories_detail.map((category, i) => (
                        <div key={i}>
                          <Accordion.Item eventKey={i}>
                            <Accordion.Header>
                              <div className="all-question-att">
                                <div className="ques-secton-pro">
                                  <ProgressBar>
                                    <ProgressBar
                                      className="progress-color-green"
                                      now={
                                        category?.questions_count
                                          ? (category?.correct_attempted_questions_count /
                                              category?.questions_count) *
                                            100
                                          : 0
                                      }
                                      key={1}
                                    />
                                    <ProgressBar
                                      className="progress-color-red"
                                      now={
                                        category?.questions_count
                                          ? (category?.incorrect_attempted_questions_count /
                                              category?.questions_count) *
                                            100
                                          : 0
                                      }
                                      key={2}
                                    />
                                  </ProgressBar>
                                </div>

                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(e) =>
                                        handleSelectCategory(e, category)
                                      }
                                      checked={checkAllCategoryQuestionsSelected(
                                        category
                                      )}
                                    />
                                  }
                                />

                                <p className="w-100 m-0 all-questions-select">
                                  {category?.category_name}{' '}
                                  <HiPlusCircle className="plus-icon-list" />
                                  <HiMinusCircle className="minus-icon-list" />
                                  <span className="float-end">
                                    {category?.attempted_questions_count} of{' '}
                                    {category?.questions_count}
                                  </span>
                                </p>
                              </div>
                            </Accordion.Header>

                            {category &&
                              category?.sub_categories?.length > 0 &&
                              category?.sub_categories?.map(
                                (subcategory, index) => (
                                  <Accordion.Body className="p-0" key={index}>
                                    <div className="verbal-type">
                                      <ul>
                                        <li>
                                          <div className="ques-secton-pro">
                                            <ProgressBar>
                                              <ProgressBar
                                                className="progress-color-green"
                                                now={
                                                  subcategory?.questions_count
                                                    ? (subcategory?.correct_attempted_questions_count /
                                                        subcategory?.questions_count) *
                                                      100
                                                    : 0
                                                }
                                                key={1}
                                              />
                                              <ProgressBar
                                                className="progress-color-red"
                                                now={
                                                  subcategory?.questions_count
                                                    ? (subcategory?.incorrect_attempted_questions_count /
                                                        subcategory?.questions_count) *
                                                      100
                                                    : 0
                                                }
                                                key={2}
                                              />
                                            </ProgressBar>
                                          </div>

                                          <FormControlLabel
                                            control={
                                              <Checkbox
                                                onChange={(e) =>
                                                  handleSelectSubcategory(
                                                    e,
                                                    subcategory
                                                  )
                                                }
                                                checked={checkAllSubcategoryQuestionsSelected(
                                                  subcategory
                                                )}
                                              />
                                            }
                                          />

                                          <p className="w-100 m-0 all-questions-select">
                                            {subcategory?.sub_category_name}
                                            <span className="float-end">
                                              {
                                                subcategory?.attempted_questions_count
                                              }{' '}
                                              of {subcategory?.questions_count}
                                            </span>
                                          </p>
                                        </li>
                                      </ul>
                                    </div>
                                  </Accordion.Body>
                                )
                              )}
                          </Accordion.Item>
                        </div>
                      ))}
                  </Accordion>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <div className="unlock-question">
                  {!courseDetails?.is_package_purchased && (
                      <Link href={`/plan/${id}/1`} className="unlock_link">
                        <FaLock
                          style={{
                            marginBottom: '4px',
                            marginRight: '5px',
                          }}
                        />
                        Unlock All Questions
                      </Link>
                  )}
                </div>
                {selectedSubcategories.length > 0 &&
                    courseDetails?.is_package_purchased && (
                        <>
                          <div
                              style={{
                                marginTop: '12px',
                              }}
                          >
                            Total Selected Questions: {selectedQuestionsCount}
                          </div>

                          {selectedQuestionsCount > 200 && (
                              <div style={{ color: 'red', marginTop: '4px' }}>
                                You cannot exceed more than 200 questions.
                              </div>
                          )}

                          <div className="slider-div">
                            <Slider
                                className="range-slider-ques"
                                value={selectedQuestionsCount}
                                onChange={(e) => setSelectedQuestionsCount(e.target.value)}
                                max={maxQuestionsCount}
                                valueLabelDisplay="auto"
                                aria-labelledby="non-linear-slider"
                            />
                          </div>
                        </>
                    )
                }

                {/*{selectedSubcategories.length > 0 &&*/}
                {/*  courseDetails?.is_package_purchased && (*/}
                {/*    <>*/}
                {/*      <div*/}
                {/*        style={{*/}
                {/*          marginTop: '12px',*/}
                {/*        }}*/}
                {/*      >*/}
                {/*        Total Selected Questions: {selectedQuestionsCount}*/}
                {/*      </div>*/}

                {/*      <div className="slider-div">*/}
                {/*        <Slider*/}
                {/*          className="range-slider-ques"*/}
                {/*          value={selectedQuestionsCount}*/}
                {/*          onChange={(e) =>*/}
                {/*            setSelectedQuestionsCount(e.target.value)*/}
                {/*          }*/}
                {/*          max={maxQuestionsCount}*/}
                {/*          valueLabelDisplay="auto"*/}
                {/*          aria-labelledby="non-linear-slider"*/}
                {/*        />*/}
                {/*      </div>*/}
                {/*    </>*/}
                {/*  )}*/}

                <button
                  className="test-start-btn float-start"
                  onClick={handleStart}
                  disabled={selectedQuestionsCount <= 0 || selectedQuestionsCount > 200}
                >
                  Next
                </button>

                {selectedSubcategories.length > 0 && (
                  <button
                    className="test-start-btn float-start"
                    onClick={handleReset}
                    disabled={false}
                  >
                    Clear
                  </button>
                )}
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 4, offset: 8 }} md={12} className="p-0">
                {!courseDetails || !courseDetails.is_package_purchased ? (
                      <div className="package-full-course free-unlock quiz_note_class" style={{ position: 'absolute', top: '440px' }}>
                        <div className="title-section" style={{ marginBottom: '0px' }}>
                          <h3>Question's Note</h3>
                        </div>
                        <p className="p-3 ">{quizNote}</p>
                      </div>
                  ): (
                    <div className="package-full-course free-unlock quiz_note_class" style={{ position : 'absolute', top : '164px' }}>
                      <div className="title-section" style={{marginBottom : '0px'}}>
                        <h3>Question's Note</h3>
                      </div>
                      <p className="p-3">{quizNote}</p>
                    </div>
                )}
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
}
