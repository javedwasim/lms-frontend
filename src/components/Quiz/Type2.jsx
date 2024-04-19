'use client';

import { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import parse from 'html-react-parser';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

import { Dustbin } from '@/components/Quiz/Dustbin';
import { Box } from '@/components/Quiz/Box';

import { handleImageUrl } from '@/lib/utils';

export default function Type2({ questionDetails, callbackForType2 }) {
  const [dataId, setDataId] = useState({});

  // the options for this question
  const questionOptions =
    questionDetails.question_option.length > 0
      ? questionDetails.question_option
      : [];

  // the answers for this question
  const answers = questionDetails?.option_answer_type;

  // retries the selected answer if question is attemtped
  const selectedAnswers = questionDetails?.question_selected
    ?.correct_option_json
    ? JSON.parse(questionDetails?.question_selected?.correct_option_json)
    : [];

  const callbackId = (info, id, answer) => {
    setDataId((pre) => {
      return { ...pre, [info.id]: answer.id };
    });
  };

  useEffect(() => {
    const answer = Object.keys(dataId).map((val, i) => {
      return {
        option_id: Number(val),
        option_value_id: Number(dataId[val]),
      };
    });

    callbackForType2(answer, selectedAnswers);
  }, [dataId, questionDetails]);

  return (
    <div className="questions-page table-data p-4">
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Container>
          <Row>
            <Col md={12}>
              {questionDetails?.question_name &&
                parse(questionDetails?.question_name)}

              {questionDetails?.question_img && (
                <img
                  src={handleImageUrl(questionDetails?.question_img)}
                  alt="question_img"
                  className="mb-3 mt-4 p-3"
                />
              )}
            </Col>

            <Col md={6}>
              {questionOptions?.map((option, i) => (
                <div className="ques" key={i}>
                  <div className="option-name">
                    <div>{option?.option_name}</div>
                  </div>
                  <Dustbin
                    callbackId={callbackId}
                    info={option}
                    answers={answers}
                    preanswer={selectedAnswers?.find(
                      (answer) => answer.option_id === option?.id
                    )}
                  />
                </div>
              ))}
            </Col>

            <Col md={6}>
              <div className="align-item">
                <div className="bg-section">
                  <Box answers={answers} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </DndProvider>
    </div>
  );
}
