'use client';

import { Col, Row } from 'react-bootstrap';
import parse from 'html-react-parser';

import { handleImageUrl } from '@/lib/utils';

export default function Type1({ answer, setAnswer, questionDetails }) {
  return (
    <div className="questions-page">
      <Row>
        <Col md={6}>
          <div className="ques-text mb-5">
            {questionDetails?.paragraph && parse(questionDetails?.paragraph)}

            {questionDetails?.paragraph_img && (
              <img
                src={handleImageUrl(questionDetails?.paragraph_img)}
                className="mb-4 mt-5"
                alt="paragraph_image"
              />
            )}
          </div>
        </Col>

        <Col md={6}>
          <div className="ques-type-1 ques-label-option p-4  ">
            {questionDetails?.question_name &&
              parse(questionDetails?.question_name)}

            {questionDetails?.question_img && (
              <img
                src={handleImageUrl(questionDetails?.question_img)}
                className="mb-4"
                alt="question_image"
              />
            )}

            <div className="question-option">
              <ul>
                {(questionDetails?.option_a ||
                  questionDetails?.option_a_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('a');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'a'}
                      />
                      {parse(questionDetails?.option_a)}
                      {questionDetails?.option_a_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_a_img)}
                          className="option-image"
                          alt="option_a_img"
                          onClick={() => {
                            setAnswer('a');
                          }}
                        />
                      )}
                    </div>
                  </li>
                )}

                {(questionDetails?.option_b ||
                  questionDetails?.option_b_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('b');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'b'}
                      />
                      {parse(questionDetails?.option_b)}
                      {questionDetails?.option_b_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_b_img)}
                          className="option-image"
                          alt="option_b_img"
                          onClick={() => {
                            setAnswer('b');
                          }}
                        />
                      )}
                    </div>
                  </li>
                )}

                {(questionDetails?.option_c ||
                  questionDetails?.option_c_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('c');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'c'}
                      />
                      {parse(questionDetails?.option_c)}
                      {questionDetails?.option_c_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_c_img)}
                          className="option-image"
                          onClick={() => {
                            setAnswer('c');
                          }}
                          alt="option_c_img"
                        />
                      )}
                    </div>
                  </li>
                )}

                {(questionDetails?.option_d ||
                  questionDetails?.option_d_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('d');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'd'}
                      />
                      {parse(questionDetails?.option_d)}
                      {questionDetails?.option_d_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_d_img)}
                          className="option-image"
                          onClick={() => {
                            setAnswer('d');
                          }}
                          alt="option_d_img"
                        />
                      )}
                    </div>
                  </li>
                )}

                {(questionDetails?.option_e ||
                  questionDetails?.option_e_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('e');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'e'}
                      />
                      {parse(questionDetails?.option_e)}
                      {questionDetails?.option_e_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_e_img)}
                          className="option-image"
                          onClick={() => {
                            setAnswer('e');
                          }}
                          alt="option_e_img"
                        />
                      )}
                    </div>
                  </li>
                )}
                {(questionDetails?.option_f ||
                  questionDetails?.option_f_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('f');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'f'}
                      />
                      {parse(questionDetails?.option_f)}
                      {questionDetails?.option_f_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_f_img)}
                          className="option-image"
                          onClick={() => {
                            setAnswer('f');
                          }}
                          alt="option_f_img"
                        />
                      )}
                    </div>
                  </li>
                )}
                {(questionDetails?.option_g ||
                  questionDetails?.option_g_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('g');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'g'}
                      />
                      {parse(questionDetails?.option_g)}
                      {questionDetails?.option_g_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_g_img)}
                          className="option-image"
                          onClick={() => {
                            setAnswer('g');
                          }}
                          alt="option_g_img"
                        />
                      )}
                    </div>
                  </li>
                )}
                {(questionDetails?.option_h ||
                  questionDetails?.option_h_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('h');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'h'}
                      />
                      {parse(questionDetails?.option_h)}
                      {questionDetails?.option_h_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_h_img)}
                          className="option-image"
                          onClick={() => {
                            setAnswer('h');
                          }}
                          alt="option_h_img"
                        />
                      )}
                    </div>
                  </li>
                )}
                {(questionDetails?.option_i ||
                  questionDetails?.option_i_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('i');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'i'}
                      />
                      {parse(questionDetails?.option_i)}
                      {questionDetails?.option_i_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_i_img)}
                          className="option-image"
                          onClick={() => {
                            setAnswer('i');
                          }}
                          alt="option_i_img"
                        />
                      )}
                    </div>
                  </li>
                )}
                {(questionDetails?.option_j ||
                  questionDetails?.option_j_img) && (
                  <li>
                    <div
                      className="radio-btn ans-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setAnswer('j');
                      }}
                    >
                      <input
                        type="radio"
                        value={answer}
                        name="answer"
                        checked={answer === 'j'}
                      />
                      {parse(questionDetails?.option_j)}
                      {questionDetails?.option_j_img && (
                        <img
                          src={handleImageUrl(questionDetails?.option_j_img)}
                          className="option-image"
                          onClick={() => {
                            setAnswer('j');
                          }}
                          alt="option_j_img"
                        />
                      )}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
