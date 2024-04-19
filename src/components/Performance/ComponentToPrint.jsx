import * as React from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import moment from "moment";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { checked: false };
  }

  render() {
    return (
      <div className="relativeCSS">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3
            style={{
              backgroundColor: "#F7F676",
              padding: "2px",
            }}
          >
            Group Summary
          </h3>
        </div>

        <Row>
          {this.props.SummaryData?.length > 0 &&
            this.props.SummaryData?.map((course, s) => (
              <div key={s}>
                <center>
                  <h5 className="mt-2">{course?.course_name}</h5>
                  <div className="user-details">
                    <table>
                      <tbody>
                        <tr style={{ backgroundColor: "#F5DAB2" }}>
                          <th></th>
                          <th colSpan={2}>Tutorials</th>
                          <th
                            colSpan={
                              this.props.Course_Details.find(
                                (report) =>
                                  report.course_detail.id === course.id
                              )?.question_category_data?.length + 2
                            }
                          >
                            Questions
                          </th>
                          <th colSpan={1}>Mocks</th>
                        </tr>

                        <tr>
                          <th>Student Name</th>
                          <th>Viewed</th>
                          <th>% Completed</th>
                          <th>% Completed</th>
                          <th>Percentile</th>

                          {this.props.Course_Details.find(
                            (report) => report.course_detail.id === course.id
                          )?.question_category_data?.map((vals, sa) => (
                            <th key={sa}>
                              Avg. % In <br />
                              {vals?.category_name}
                            </th>
                          ))}

                          <th>Avg. in Mocks %</th>
                        </tr>

                        {this.props.Course_Details &&
                          this.props.Course_Details?.map((report) => {
                            return report?.course_detail?.id == course?.id ? (
                              <tr>
                                <td>{report?.user_data?.name}</td>
                                <td>{report?.seen_tutorial}</td>

                                <td>
                                  {parseFloat(
                                    report?.percentage_tutorial
                                  )?.toFixed(2)}{" "}
                                  %
                                </td>

                                <td>
                                  {report?.total_questions !== 0
                                    ? (
                                        (report?.total_attempted_questions *
                                          100) /
                                        report?.total_questions
                                      )?.toFixed(2)
                                    : "0.00"}{" "}
                                  %
                                </td>

                                <td>
                                  {parseInt(report?.your_percentile)?.toFixed(
                                    2
                                  )}{" "}
                                  %
                                </td>

                                {report?.question_category_data?.map(
                                  (category) => (
                                    <td>
                                      {category?.attempted_questions_by_user_count
                                        ? (
                                            (category?.correct_attempted_questions_by_user_count *
                                              100) /
                                            category?.attempted_questions_by_user_count
                                          ).toFixed(2)
                                        : "0.00"}
                                      %
                                    </td>
                                  )
                                )}

                                {
                                  <td>
                                    {report?.total_mock_questions_attempted
                                      ? (
                                          (report?.total_correct_mock_questions *
                                            100) /
                                          report?.total_mock_questions_attempted
                                        )?.toFixed(2)
                                      : "0.00"}{" "}
                                    %
                                  </td>
                                }
                              </tr>
                            ) : (
                              ""
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </center>
              </div>
            ))}
        </Row>

        <Row>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <table>
              <tbody>
                <tr style={{ backgroundColor: "#F5DAB2" }}>
                  <th colSpan={14}>Questions Attempted</th>
                </tr>

                <tr>
                  <th>Student Name</th>
                  <th>Course</th>
                  {months.map((month) => (
                    <th key={month}>{month}</th>
                  ))}
                </tr>

                {this.props.Course_Details.map((course) => {
                  return (
                    <tr key={course?.course_detail?.id}>
                      <td>{course?.user_data?.name}</td>
                      <td>{course?.course_detail?.course_name}</td>
                      {months.map((month, i) => (
                        <td>
                          {course?.total_attempted_questions_by_month?.[
                            (i + 1).toString().padStart(2, "0")
                          ] || 0}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Row>

        {/* <Row>
          {summaryData && summaryData.length > 0 ? (
            summaryData?.map((val, i) => (
              <>
                <hr style={{ margin: '24px 0' }} />

                <Col md={6}>
                  <center>
                    <h2>
                      Tutorials Statistics - {val?.course_detail?.course_name}{' '}
                    </h2>
                  </center>
                  <Row className="mb-5">
                    <Col lg={6} md={6}>
                      <div className="tutorial-percent-bar total-fil-ds-detail  position-relative W-100">
                        <CircularProgressbarWithChildren
                          value={
                            val && val?.percentage_tutorial
                              ? val?.percentage_tutorial
                              : 0
                          }
                        >
                          <div style={{ color: '#663794', fontSize: '25px' }}>
                            {val && val?.percentage_tutorial != undefined
                              ? Math.ceil(val?.percentage_tutorial).toFixed()
                              : 0}
                            %
                          </div>
                          <span className="circulartext">Completed</span>
                        </CircularProgressbarWithChildren>
                      </div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="tutorials-seen-detail">
                        <ul className="p-0">
                          <li>
                            <span></span>
                            <h6 style={{ fontSize: '19px' }}>
                              <strong>{val && val?.seen_tutorial}</strong>
                            </h6>
                            <h6 style={{ fontSize: '19px' }}>Tutorials seen</h6>
                          </li>
                          <li>
                            <span className="no-fill"></span>
                            <h6>
                              <strong>{val && val?.remaining_tutorial}</strong>
                            </h6>
                            <h6 style={{ fontSize: '20px' }}>
                              Tutorials remaining
                            </h6>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                  <div className="pr-main-se mt-5">
                    {val?.tutorial_category_data?.map((res, index) => (
                      <div className="progress-section" key={index}>
                        <h4>
                          {res.category_name?.charAt(0).toUpperCase() +
                            res.category_name?.slice(1)}

                          <span>
                            {res.tutorial_seen_by_me} of {res.total_tutorials}{' '}
                            <p
                              className="tutorial-seen"
                              style={{ display: 'inline-grid' }}
                            >
                              tutorials seen
                            </p>
                          </span>
                        </h4>
                        <ProgressBar
                          now={
                            Number(res.tutorial_seen_by_me * 100) /
                            Number(res.total_tutorials)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <hr />
                </Col>

                <Col md={6}>
                  <center>
                    <h2>
                      Questions Statistics - {val?.course_detail?.course_name}
                    </h2>
                  </center>

                  <div
                    className="all-section px-4 mt-5 text-start mb-5 "
                    key={i}
                  >
                    <Row>
                      <Col md={6}>
                        <div className="ave-score  border-right float-end   ">
                          <h3 className="" style={{ marginLeft: '25px' }}>
                            {val && val?.your_total_average_score
                              ? val?.your_total_average_score + '%'
                              : '0%'}
                          </h3>
                          <p style={{ marginRight: '20px' }}>
                            Your Average Score
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="ave-score float-start">
                          <h3 style={{ marginLeft: '15px' }}>
                            {val && val?.your_percentile
                              ? val?.your_percentile.toFixed() + '%'
                              : '0%'}
                          </h3>
                          <p>Your Percentile</p>
                        </div>
                      </Col>
                    </Row>

                    {this.props.Course_Details &&
                      val.question_category_data?.map((res, index) => (
                        <div className="score-progress mt-5" key={index}>
                          <h4>
                            {res.category_name?.charAt(0).toUpperCase() +
                              res.category_name?.slice(1)}
                            <span>
                              SM Average:{' '}
                              {(Math.round(res.mm_score * 10) / 10).toFixed()}%
                            </span>
                            <span>
                              You:{' '}
                              {(Math.round(res.your_score * 10) / 10).toFixed()}
                              %
                            </span>
                          </h4>
                          <ProgressBar
                            now={Math.round(res.your_score * 10) / 10}
                          />
                          <ProgressBar
                            now={Math.round(res.mm_score * 10) / 10}
                          />
                        </div>
                      ))}
                  </div>
                  <hr />
                  <br />
                  <br />
                </Col>
              </>
            ))
          ) : (
            <center>No Data Found</center>
          )}
        </Row> */}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3
            style={{
              backgroundColor: "#F7F676",
              padding: "2px",
            }}
          >
            Individual Summary
          </h3>
        </div>

        <Row>
          {this.props.Course_Details && this.props.Course_Details.length > 0 ? (
            this.props.Course_Details?.map((report, i) => (
              <>
                <div className="student-data px-5">
                  <h3>Student Name - {report?.user_data?.name}</h3>
                  <h5>
                    Last Active -{" "}
                    {moment(report?.user_data?.last_login_date).format("LLL")}
                  </h5>
                </div>

                <hr style={{ margin: "12px 0" }} />

                <Col md={6}>
                  <center>
                    <h2>
                      Tutorials Statistics -{" "}
                      {report?.course_detail?.course_name}{" "}
                    </h2>
                  </center>

                  <Row className="mb-5">
                    <Col lg={6} md={6}>
                      <div className="tutorial-percent-bar total-fil-ds-detail  position-relative W-100">
                        <CircularProgressbarWithChildren
                          value={
                            report && report?.percentage_tutorial
                              ? report?.percentage_tutorial
                              : 0
                          }
                        >
                          <div style={{ color: "#663794", fontSize: "25px" }}>
                            {report && report?.percentage_tutorial != undefined
                              ? Math.ceil(report?.percentage_tutorial).toFixed()
                              : 0}
                            %
                          </div>
                          <span className="circulartext">Completed</span>
                        </CircularProgressbarWithChildren>
                      </div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div className="tutorials-seen-detail">
                        <ul className="p-0">
                          <li>
                            <span></span>
                            <h6 style={{ fontSize: "19px" }}>
                              <strong>{report && report?.seen_tutorial}</strong>
                            </h6>
                            <h6 style={{ fontSize: "19px" }}>Tutorials seen</h6>
                          </li>
                          <li>
                            <span className="no-fill"></span>
                            <h6>
                              <strong>
                                {report && report?.remaining_tutorial}
                              </strong>
                            </h6>
                            <h6 style={{ fontSize: "20px" }}>
                              Tutorials remaining
                            </h6>
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>

                  <div className="pr-main-se mt-5">
                    {report?.tutorial_category_data?.map((category, index) => (
                      <div className="progress-section" key={index}>
                        <h4>
                          {category.category_name?.charAt(0).toUpperCase() +
                            category.category_name?.slice(1)}

                          <span>
                            {category.watched_tutorials_count} of{" "}
                            {category.tutorials_count}{" "}
                            <p
                              className="tutorial-seen"
                              style={{ display: "inline-grid" }}
                            >
                              tutorials seen
                            </p>
                          </span>
                        </h4>
                        <ProgressBar
                          now={
                            Number(category.watched_tutorials_count * 100) /
                            Number(category.tutorials_count)
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <hr />
                </Col>

                <Col md={6}>
                  <center>
                    <h2>
                      Questions Statistics -{" "}
                      {report?.course_detail?.course_name}
                    </h2>
                  </center>

                  <div
                    className="all-section px-4 mt-5 text-start mb-5 "
                    key={i}
                  >
                    <Row>
                      <Col md={6}>
                        <div className="ave-score  border-right float-end   ">
                          <h3 className="" style={{ marginLeft: "25px" }}>
                            {report && report.your_total_average_score
                              ? Math.round(
                                  report.your_total_average_score * 100
                                ) + "%"
                              : "0%"}
                          </h3>
                          <p style={{ marginRight: "20px" }}>
                            Your Average Score
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="ave-score float-start">
                          <h3 style={{ marginLeft: "15px" }}>
                            {report && report.your_percentile
                              ? report.your_percentile.toFixed() + "%"
                              : "0%"}
                          </h3>
                          <p>Your Percentile</p>
                        </div>
                      </Col>
                    </Row>

                    {report?.question_category_data?.map((category, index) => (
                      <div className="score-progress mt-5" key={index}>
                        <h4>
                          {category?.category_name?.charAt(0).toUpperCase() +
                            category?.category_name?.slice(1)}
                          <span>
                            SM Average:{" "}
                            {category?.attempted_questions_count
                              ? (
                                  (category?.correct_attempted_questions_count *
                                    100) /
                                  category?.attempted_questions_count
                                ).toFixed()
                              : 0}
                            %
                          </span>
                          <span>
                            You:{" "}
                            {category?.attempted_questions_by_user_count
                              ? (
                                  (category?.correct_attempted_questions_by_user_count *
                                    100) /
                                  category?.attempted_questions_by_user_count
                                ).toFixed()
                              : 0}
                            %
                          </span>
                        </h4>
                        <ProgressBar
                          now={
                            category?.attempted_questions_by_user_count
                              ? (category?.correct_attempted_questions_by_user_count *
                                  100) /
                                category?.attempted_questions_by_user_count
                              : 0
                          }
                        />
                        <ProgressBar
                          now={
                            category?.attempted_questions_count
                              ? (category?.correct_attempted_questions_count *
                                  100) /
                                category?.attempted_questions_count
                              : 0
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <hr />
                  <br />
                  <br />
                </Col>

                {Object.keys(report.mock_test_results).length > 0 && (
                  <div style={{ padding: "24px" }}>
                    <center>
                      <h3 className="mb-4">
                        <b>Mock Results</b>
                      </h3>
                    </center>

                    {Object.keys(report.mock_test_results).map(
                      (mockTestId, i) => (
                        <div
                          className="tables data-result-table"
                          key={mockTestId}
                        >
                          <h6 style={{ marginTop: "4px", textAlign: "center" }}>
                            Mock {i + 1}
                          </h6>
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
                                {report.mock_test_results[mockTestId].map(
                                  (mockResult) => (
                                    <tr key={mockResult?.category_id}>
                                      <td>{mockResult?.category_name}</td>
                                      <td>
                                        {mockResult?.percentage_score + "%"}
                                      </td>
                                      <td>
                                        {mockResult?.avg_of_all_users + "%"}
                                      </td>
                                      <td>{mockResult?.correct}</td>
                                      <td>{mockResult?.total_questions}</td>
                                      <td>{mockResult?.ucat_score}</td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </center>
                        </div>
                      )
                    )}
                  </div>
                )}
              </>
            ))
          ) : (
            <center>No Data Found</center>
          )}
        </Row>
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  // eslint-disable-line max-len
  return <ComponentToPrint ref={ref} text={props.text} />;
});
