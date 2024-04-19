import React, { useEffect, useState } from 'react';
import { Col, Container, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import '@/styles/DashboardSidebar.css';
import '@/styles/Dashboard.css';
import { useMockTestScore } from '@/hooks/mockTest';
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MockResultModal(props) {
  const [loadingScore, setLoadingScore] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);
  const { data: mockTestScore } = useMockTestScore(
    props.courseId,
    props.mockTestId
  );

  const handleTabSelect = (key) => {
    if (key === 'home') {
      setLoadingScore(true);
      setLoadingReview(false); // Ensure other loading state is false
      setTimeout(() => {
        setLoadingScore(false);
      }, 1000);
    } else if (key === 'profile') {
      setLoadingReview(true);
      setLoadingScore(false);
      setTimeout(() => {
        setLoadingReview(false);
      }, 2000);
    }
  };

  const categories = mockTestScore?.category_data?.map((category, i) => {
    return category.category_name;
  });

  const myScore = mockTestScore?.category_data?.map((category, i) => {
    return category.your_score_in_percent;
  });

  const otherScore = mockTestScore?.category_data?.map((category, i) => {
    return category.avg_of_all_users;
  });

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
      categories: categories,
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
      data: myScore,
    },
    {
      name: 'Other Users',
      data: otherScore,
    },
  ];

  let performedData =
    Math.floor(mockTestScore?.your_score) -
    Math.floor(mockTestScore?.avg_score_of_all_users);

  const getQuestionExplanation = (e, question, category) => {
    const allQuestions = category.questionlist.map(
      (question) => question.question_id
    );

    localStorage.setItem('questionIdForReview', question.question_id);
    localStorage.setItem('questionIdsForReview', allQuestions);

    window.open(`/mock-test/explanation`, '_blank');
  };

  return (
    <div>
      <Modal
        className="resultmodal"
        {...props}
        fullscreen={'xxl-down'}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Final Score
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tab-review-modal">
            <Tabs
              defaultActiveKey="home"
              transition={true}
              id="noanim-tab-example"
              className="mb-3 p-0 "
              onSelect={handleTabSelect}
            >
              <Tab eventKey="home" title="Your Score">
                {loadingScore ? (
                    <div className="loading-container">
                      <div className="loading-spinner">
                        <CircularProgress />
                      </div>
                    </div>
                    ) : (
                <div>
                  <center>
                    <div className="header">
                      <h4>
                        Your Score:{' '}
                        {mockTestScore?.your_score > 0
                          ? Math.floor(mockTestScore?.your_score) + '%'
                          : 0 + '%'}{' '}
                      </h4>
                      <h4>
                        Average Score of All Users:{' '}
                        {mockTestScore?.avg_score_of_all_users
                          ? Math.floor(mockTestScore?.avg_score_of_all_users) +
                            '%'
                          : '0'}
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
                              <th>Total Questions</th>
                              <th>Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockTestScore?.category_data?.length > 0
                              ? mockTestScore?.category_data?.map(
                                  (category, i) => (
                                    <tr>
                                      <td>{category?.category_name}</td>
                                      <td>
                                        {category?.my_total_correct_questions +
                                          '%'}
                                      </td>
                                      <td>
                                        {category?.avg_of_all_users + '%'}
                                      </td>
                                      <td>{category?.correct}</td>
                                      <td>{category?.total_question}</td>
                                      <td>{category?.ucat_score}</td>
                                    </tr>
                                  )
                                )
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
                )}
              </Tab>
              <Tab eventKey="profile" title="Question Review" >
                {loadingReview ? (
                    <div className="loading-container">
                      <div className="loading-spinner">
                        <CircularProgress />
                      </div>
                    </div>
                ) : (
                <div className="question_list">
                  <Container>
                    <div className="review-quest">
                      <h2>Final Answer Review Screen</h2>
                      <p>
                        Once you complete ALL sections of the mock test, you
                        will be able to review the answers and explanations.
                      </p>
                    </div>

                    <Row>
                      {props.reviewList?.review_list?.length != 0
                        ? props.reviewList?.review_list?.map((value, i) => (
                            <>
                              <div key={i}>
                                <h3>{value?.categoryName}</h3>
                              </div>
                              {value?.questionlist?.map((val, q) => (
                                <Col md={4} key={q}>
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
                                      getQuestionExplanation(e, val, value)
                                    }
                                  >
                                    Question {q + 1}
                                    {val?.check_already_review == '1' ? (
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
                                        {val.check_already_review == '1' ? (
                                          <h6
                                            className="status-que"
                                            style={{ color: 'black' }}
                                          >
                                            Flagged
                                          </h6>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                    ) : (
                                      ''
                                    )}
                                    {val.que_status == 'Correct' ? (
                                      <>
                                        <div
                                          style={{
                                            backgroundColor:
                                              val?.que_status_color,
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
                                            {val.que_status}
                                          </h6>
                                        </div>
                                      </>
                                    ) : (
                                      <div
                                        style={{
                                          backgroundColor:
                                            val?.que_status_color,
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
                                          {val.que_status}
                                        </h6>
                                      </div>
                                    )}
                                  </div>
                                </Col>
                              ))}
                              <br />
                            </>
                          ))
                        : 'No Questions'}
                    </Row>
                  </Container>
                  <br />
                </div>
                )}
              </Tab>
            </Tabs>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
