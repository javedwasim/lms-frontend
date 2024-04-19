import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import parse from 'html-react-parser';
import { handleImageUrl } from '@/lib/utils';
import moment from 'moment';
import { Row, Col, Container } from 'react-bootstrap';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import StarRatings from 'react-star-ratings';
import {
  AiTwotoneLike,
  AiTwotoneDislike,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from 'react-icons/ai';

function Type2({ questionlist }) {
  const [questionLikeUnlike, setQuestionLikeUnlike] = useState({
    like: 0,
    dislike: 0,
  });
  const [name, setName] = useState('');
  const [ratingText, setRatingText] = useState(false);

  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [showName, setShowName] = useState(true);

  useEffect(() => {
    setRating(
      questionlist?.my_question_rating &&
        Number(questionlist?.my_question_rating)
    );
  }, [questionlist]);

  const setRatings = (newRating) => {
    setRating(newRating);
    setRatingText(true);
  };

  const handleLike = (e, id) => {};

  const addComment = () => {
    setName('');
    setMessage('');
  };

  const optionBox = questionlist?.question_list?.question_option;

  return (
    <div className="questions-page">
      <DndProvider backend={HTML5Backend}>
        <Container>
          <Row>
            <Col md={12}>
              <p>
                {questionlist?.question_list?.question_name
                  ? parse(questionlist?.question_list?.question_name)
                  : ''}
              </p>
              {questionlist?.question_list?.question_img ? (
                <img
                  src={handleImageUrl(
                    questionlist?.question_list?.question_img
                  )}
                  alt="question_img"
                  className="mb-3 mt-4 p-3"
                />
              ) : (
                ''
              )}
            </Col>

            <Col md={6}>
              {optionBox?.map((val, i) => (
                <>
                  <div className="ques">
                    <div className="option-name">
                      <div key={i}>{val?.option_name}</div>
                    </div>
                  </div>
                </>
              ))}
            </Col>

            <Col md={6}>
              <div className="align-item"></div>
            </Col>
            <Row className="mt-5">
              <Col md={12}>
                <div style={{ marginLeft: '50px' }}>
                  <span style={{ cursor: 'pointer' }}>
                    <AiTwotoneLike
                      fontSize="30px"
                      color="green"
                      onClick={(e) => handleLike(e, 1)}
                    />{' '}
                    {questionLikeUnlike?.like}
                  </span>
                  <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                    <AiTwotoneDislike
                      fontSize="30px"
                      color="red"
                      onClick={(e) => handleLike(e, 2)}
                    />{' '}
                    {questionLikeUnlike?.dislike}
                  </span>
                </div>

                {questionlist?.allOption?.length > 0 ? (
                  <div className=" tables data-result-table p-2 ">
                    <table className="">
                      <thead>
                        <tr className="tableheader">
                          <th>Option Name</th>
                          <th>Correct Answer </th>
                          <th>Your Answer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questionlist?.allOption?.length > 0
                          ? questionlist?.allOption?.map((val, i) => (
                              <tr>
                                <td>{val?.optionName}</td>
                                <td>{val?.correct_option_answer}</td>
                                <td>{val?.givenOption_value_text}</td>
                              </tr>
                            ))
                          : ''}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ''
                )}

                {questionlist?.question_list?.explanation ? (
                  <div className="p-2 ">
                    <h2>Answer Explanation </h2>
                    {parse(questionlist?.question_list?.explanation)}
                  </div>
                ) : (
                  ''
                )}

                {questionlist?.question_list?.explanation_video ? (
                  <div className=" p-2 ">
                    <h2>Explanation Video</h2>
                    <video width="320" height="240" controls>
                      <source
                        src={`${process.env.REACT_APP_SPACES_URL}/${questionlist?.question_list?.explanation_video}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  ''
                )}

                <div className="p-2 mt-5">
                  <h6 className="text-star">
                    Rate Explanation:{' '}
                    <span style={{ marginLeft: '5px' }}> </span>
                    <StarRatings
                      rating={rating}
                      starRatedColor="#251446"
                      changeRating={setRatings}
                      starDimension="20px"
                      starSpacing="2px"
                      numberOfStars={5}
                      name="rating"
                    />
                  </h6>
                  {ratingText && (
                    <span>
                      You gave a {rating} star rating to this question
                    </span>
                  )}
                </div>

                {questionlist?.packageStatus === 'paid' ? (
                  <div className=" p-2  mt-5 ">
                    <h5>Add Comment</h5>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={showName}
                          onChange={(e) => setShowName(!showName)}
                        />
                      }
                      label="Show my Name"
                    />
                    <br />
                    {showName ? (
                      <input
                        type="text"
                        className="comment_div"
                        name="name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    ) : (
                      ''
                    )}
                    <br />
                    <textarea
                      id="message"
                      className="comment_div"
                      name="message"
                      rows="4"
                      placeholder="Enter Message"
                      cols="50"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                    <br />
                    {message ? (
                      <button className="next-btnss" onClick={addComment}>
                        Post Comment
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  ''
                )}
                <hr />
                <div className="px-4">
                  <h2 className="mb-4">Comments</h2>
                  {questionlist?.question_list?.comments?.map((val, i) => (
                    <div className="mb-4 ">
                      <div className="com-user-profile">
                        <div className="d-flex">
                          <div className="user-profile-img">
                            <img
                              src={
                                val?.profile_photo_path != null
                                  ? handleImageUrl(val?.profile_photo_path)
                                  : '/images/avatar.png'
                              }
                              alt="user"
                              style={{ borderRadius: '100%' }}
                            />
                          </div>
                          <p>
                            {val?.is_name_display == 1
                              ? val?.user_name
                              : 'User'}
                          </p>
                        </div>
                        <div>
                          <span>{moment(val?.created_at).format('LL')}</span>
                        </div>
                      </div>

                      <span>
                        <div className="link-dislike-section">
                          <span
                            className="span-avg"
                            style={{ cursor: 'pointer' }}
                          >
                            <AiOutlineArrowUp
                              fontSize="30px"
                              color="green"
                              onClick={(e) =>
                                AddLikeToComment(e, val?.comment_id, 'like')
                              }
                            />{' '}
                            {val?.likeCount}
                          </span>
                          <span
                            className="span-avg"
                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                          >
                            <AiOutlineArrowDown
                              fontSize="30px"
                              color="red"
                              onClick={(e) =>
                                AddLikeToComment(e, val?.comment_id, 'dislike')
                              }
                            />{' '}
                            {val?.disLikeCount}
                          </span>
                        </div>
                      </span>
                      <span className="desc-user-1">
                        {val.comment}
                        <br />
                        <br />
                        {val?.adminReply && val?.adminReply?.length > 0
                          ? val?.adminReply?.map((reply, ii) => (
                              <>
                                <div style={{ paddingLeft: '60px' }}>
                                  <div className="com-user-profiles">
                                    <div className="user-profile-img">
                                      <img
                                        src={
                                          reply?.user?.profile_photo_path !=
                                          null
                                            ? handleImageUrl(
                                                reply?.user?.profile_photo_path
                                              )
                                            : '/images/avatar.png'
                                        }
                                        style={{ borderRadius: '100%' }}
                                        alt="user"
                                      />
                                    </div>
                                    <p>Admin</p>
                                  </div>

                                  <span style={{ paddingLeft: '42px' }}>
                                    {reply?.comment}
                                  </span>

                                  <div className="link-dislike-section">
                                    <span
                                      className="span-avg"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <AiOutlineArrowUp
                                        fontSize="30px"
                                        color="green"
                                        onClick={(e) =>
                                          AddLikeToComment(e, reply?.id, 'like')
                                        }
                                      />{' '}
                                      {reply?.likeCount}
                                    </span>
                                    <span
                                      className="span-avg"
                                      style={{
                                        marginLeft: '10px',
                                        cursor: 'pointer',
                                      }}
                                    >
                                      <AiOutlineArrowDown
                                        fontSize="30px"
                                        color="red"
                                        onClick={(e) =>
                                          AddLikeToComment(
                                            e,
                                            reply?.id,
                                            'dislike'
                                          )
                                        }
                                      />{' '}
                                      {reply?.disLikeCount}
                                    </span>
                                  </div>
                                </div>
                              </>
                            ))
                          : ''}
                        <hr />
                      </span>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Row>
        </Container>
      </DndProvider>
    </div>
  );
}

export default Type2;
