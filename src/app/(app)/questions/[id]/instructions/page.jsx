'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Modal } from 'react-bootstrap';

import parse from 'html-react-parser';

import '@/styles/QuestionsStart.css';
import '@/styles/Dashboard.css';
import '@/styles/Header.css';

import { useAuth } from '@/hooks/auth';
import { useCourseInstructions } from '@/hooks/course';
import { fetchQuizCountdownTime } from '@/requests/quiz';

export default function Instructions({ params }) {
  const courseId = parseInt(params.id);

  const { user } = useAuth({ middleware: 'auth' });

  const { data: courseInstructions } = useCourseInstructions(courseId);

  const [timeResponse, setTimeResponse] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const setExamTime = (categoryIndex) => {
    localStorage.setItem(
      'count_down_time_for_exam',
      timeResponse?.additional_category[categoryIndex].time
    );

    setShowModal(false);
  };

  useEffect(() => {
    fetchQuizCountdownTime(courseId).then((res) => {
      setTimeResponse(res);
    });
  }, []);

  useEffect(() => {
    if (timeResponse) {
      if (timeResponse?.popup_status === 1) {
        setShowModal(true);
      } else {
        localStorage.setItem(
          'count_down_time_for_exam',
          timeResponse?.additional_category[0].time
        );
      }
    }
  }, [timeResponse]);

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

      <div className="main-instruction">
        <div className="container p-4">
          <h4 className="mb-4 text-center">
            <strong> Instructions</strong>
          </h4>

          {courseInstructions && parse(courseInstructions)}

          <div className="start-test-btns mt-5">
            <Link href="/quiz" scroll={true}>
              Next
            </Link>
          </div>
        </div>

        <Modal
          show={showModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal-addination-btn"
        >
          <Modal.Body>
            <div className="addination-heading">
              <h4>Which UCAT Exam are you sitting?</h4>
            </div>
            <div className="addination-time">
              <button onClick={() => setExamTime(0)}>UCAT</button>
              <p>No extra time</p>
              <button onClick={() => setExamTime(1)}>UCATSEN</button>
              <p>25% extra time</p>
              <button onClick={() => setExamTime(2)}>UCATSEN50</button>
              <p>50% extra time</p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
