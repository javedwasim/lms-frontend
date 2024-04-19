'use client';

import { useState } from 'react';

import { BiArrowBack } from 'react-icons/bi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import Type1 from '@/components/Explanation/Type1';
import Type2 from '@/components/Explanation/Type2';
import Type5 from '@/components/Explanation/Type5';

import { useMockQuestionFeedback } from '@/hooks/questions';
import Link from 'next/link';

export default function Explanation() {
  let firstQuestionIdForReview = null;

  if (typeof window !== 'undefined') {
    firstQuestionIdForReview = localStorage.getItem('questionIdForReview');
    firstQuestionIdForReview = parseInt(firstQuestionIdForReview);
  }

  const [questionId, setQuestionId] = useState(firstQuestionIdForReview);

  const { data: questionFeedback } = useMockQuestionFeedback(questionId);
  const questionType = questionFeedback?.question_list?.question_type;

  let questionIds = [];

  if (typeof window !== 'undefined') {
    questionIds = localStorage.getItem('questionIdsForReview');
    questionIds = questionIds?.split(',').map((id) => parseInt(id));
  }

  const currentQuestionIndex = questionIds.indexOf(questionId);

  const nextQuestionId =
    currentQuestionIndex + 1 < questionIds.length
      ? questionIds[currentQuestionIndex + 1]
      : null;

  const prevQuestionId =
    currentQuestionIndex - 1 >= 0
      ? questionIds[currentQuestionIndex - 1]
      : null;

  const handlePrevQuestion = () => {
    setQuestionId(prevQuestionId);
  };

  const handleNextQuestion = () => {
    setQuestionId(nextQuestionId);
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#251446',
          zIndex: '999',
          color: 'white',
          display: 'flex',
          top: '0',
          position: 'fixed',
          justifyContent: 'space-between',
          zIndex: '999',
        }}
      >
        <div>
          <h5>Question's Review</h5>
        </div>

        <div className="ques-timeing">
          Question: {questionFeedback?.question_list?.id}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          zIndex: '999',
          padding: '16px 10px',
          position: 'fixed',
          top: '52px',
          backgroundColor: '#251446d6',
          color: 'white',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: '999',
        }}
      ></div>

      {questionType == '1' && <Type1 questionlists={questionFeedback} />}
      {questionType == '2' && <Type2 questionlist={questionFeedback} />}
      {questionType == '5' && <Type5 questionlists={questionFeedback} />}

      <footer>
        <div
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#251446',
            color: 'white',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Link href="/">
            <button className="next-btn">Home</button>
          </Link>

          {prevQuestionId && (
            <button className="pre-btn" onClick={handlePrevQuestion}>
              <BiArrowBack fontSize={20} color="white" /> Previous
            </button>
          )}

          {nextQuestionId && (
            <button
              className="next-btn"
              onClick={(e) => {
                handleNextQuestion(e);
              }}
            >
              Next
              <HiOutlineArrowNarrowRight fontSize={20} color="white" />
            </button>
          )}
        </div>
      </footer>
    </>
  );
}
