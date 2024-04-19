'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Row, Col } from 'react-bootstrap';

import '@/styles/Questions.css';
import '@/styles/QuestionsStart.css';

import { useAuth } from '@/hooks/auth';

export default function QuestionsStart({ params }) {
  const { id } = params;
  const type = 4;

  const { user } = useAuth({ middleware: 'auth' });

  const [timed, setTimed] = useState(false);
  const [untimed, setUntimed] = useState(true);

  useEffect(() => {
    localStorage.setItem('timed', false);
  }, []);

  return (
    <div className="hero-section">
      <Row>
        <Col md={12}>
          <div className="section-heading mt-4">
            <h2 className="m-0">Questions</h2>
            <p className="steps-cd">
              <Link href={`/dashboard/${id}`}>Progress</Link> /{' '}
              <Link href={`/questions/${id}`}>Questions</Link>
            </p>
          </div>
        </Col>
      </Row>

      <div className="ques-categories categories-questions">
        <span className="tag-line-ques">
          Which categories of questions would you like to attempt?
        </span>
        <p className="headiing-p">
          How would you like to attempt these questions?
        </p>
        <div className="d-inline-block">
          <div
            className={untimed ? 'ques-type-2 active' : 'ques-type-2'}
            onClick={() => {
              setUntimed(true);
              setTimed(false);
              localStorage.setItem('timed', false);
            }}
            style={{
              cursor: 'pointer',
            }}
          >
            <label className="custom">
              <img
                className="w-50 m-auto"
                src="https://www.seekpng.com/png/full/10-106333_watch-icon-png-smiley-icon.png"
                alt="img"
              />
              <input type="checkbox" defaultChecked={untimed} />
              <p>Un-timed</p>
            </label>
          </div>
          <div
            className={timed ? 'ques-type-2 active' : 'ques-type-2 '}
            onClick={() => {
              setTimed(true);
              setUntimed(false);
              localStorage.setItem('timed', true);
            }}
          >
            <label className="custom">
              <img
                className="w-50 m-auto "
                src="https://ebsl.org/wp-content/uploads/media/icon-timer.png"
                alt="img"
              />
              <input type="checkbox" defaultChecked={timed} />
              <p>Timed</p>
            </label>
          </div>
        </div>
      </div>

      <Row>
        <Col md={4}>
          <div className="rang-slider-1">
            <div className="App">
              <div className="start-test-btn">
                {type && type === 1 ? (
                  <Link href={`/instructions/practice/${1}`}>Start</Link>
                ) : (
                  <Link href="./instructions">Start</Link>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
