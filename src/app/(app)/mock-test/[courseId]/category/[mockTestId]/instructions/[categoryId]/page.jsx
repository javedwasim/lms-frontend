'use client';
import { useState, useEffect } from 'react';
import { useMockTest } from '@/hooks/mockTest';
import parse from 'html-react-parser';
import Link from 'next/link';
import { CircularProgress } from '@mui/material'; // Import CircularProgress for loading indicator

import '@/styles/Dashboard.css';
import '@/styles/Header.css';
import '@/styles/QuestionsStart.css';

function Instruction({ params }) {
  const mockTestId = parseInt(params.mockTestId);
  const categoryId = parseInt(params.categoryId);
  const [counter, setCounter] = useState(5);
  const { data, isLoading } = useMockTest(mockTestId, categoryId);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);
    setTimeout(() => {
      setShowInstructions(true);
      clearInterval(timer);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextClick = () => {
    window.location.href = '/mock-test/quiz';
  };

  return (
    <div className="container">
      <div className="back-link ques-back-btn m-4">
        <Link href="/">
          <p>
            <span className="rotateicons">
              <img src="/icons/right-arrow.svg" alt="back" />
            </span>
            Back to my courses
          </p>
        </Link>
      </div>
      {isLoading || !showInstructions ? (
          <div className="loading-container">
            <div className="loading-spinner">
              <CircularProgress color="inherit" />
            </div>
            <p>Please wait while exam Instructions is loading...</p>
            <p>Time remaining: {counter} seconds</p>
          </div>
      ) : (
        <div className="main-instruction">
          <div className="container p-4">
            <h4 className="mb-4 text-center">
              <strong> Instructions</strong>
            </h4>

            {data?.instruction && parse(data?.instruction)}

            <div className="start-test-btns mt-5 ">
              <Link href="#" onClick={handleNextClick}>Next</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Instruction;
