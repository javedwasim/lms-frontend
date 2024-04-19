import { useState } from 'react';
import parse from 'html-react-parser';
import moment from 'moment';

import { Col, Row, ProgressBar } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  AiTwotoneLike,
  AiTwotoneDislike,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from 'react-icons/ai';
import { handleImageUrl } from '@/lib/utils';

export default function Type1({ questionlists }) {
  let questionlist = questionlists?.question_list;

  const [questionLikeUnlike, setQuestionLikeUnlike] = useState({
    like: 0,
    dislike: 0,
  });
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingText, setRatingText] = useState(false);
  const [showName, setShowName] = useState(true);

  const setRatings = () => {};

  if (!questionlist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="questions-page">
      <Row>
        <Col md={6}>
          <div className="ques-text">
            <p>{parse(questionlist?.paragraph)}</p>
            {questionlist?.paragraph_img != null ? (
              <img
                src={handleImageUrl(questionlist?.paragraph_img)}
                alt="paragraph_image"
                className="mb-4 mt-5"
              />
            ) : (
              ''
            )}
          </div>
        </Col>
        <Col md={6}>
          <div className="ques-type-1 ques-label-option p-4">
            <p>{parse(questionlist?.question_name)}</p>
            {questionlist?.question_img && (
              <img
                src={handleImageUrl(questionlist?.question_img)}
                alt="question_image"
                className="mb-4"
              />
            )}

            <div className="question-option">
              <ul>
                {questionlist?.option_a == null ||
                (questionlist?.option_a == '' &&
                  questionlist?.option_a_img == null) ||
                questionlist?.option_a_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'a' && questionlists?.my_answer == 'a'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'a'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'a' &&
                                  questionlists?.my_answer != 'a'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.a &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.a * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_a)}
                          <span>
                            {`${
                              questionlists?.options_count?.a &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.a * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>
                    </li>
                  </>
                )}
                {questionlist?.option_b == null ||
                (questionlist?.option_b == '' &&
                  questionlist?.option_b_img == null) ||
                questionlist?.option_b_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'b' && questionlists?.my_answer == 'b'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'b'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'b' &&
                                  questionlists?.my_answer != 'b'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.b &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.b * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_b)}
                          <span>
                            {`${
                              questionlists?.options_count?.b &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.b * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>

                      {questionlist?.option_b_img ? (
                        <img
                          src={handleImageUrl(questionlist?.option_b_img)}
                          className="option-image"
                          alt="option_b_img"
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                )}

                {questionlist?.option_c == null ||
                (questionlist?.option_c == '' &&
                  questionlist?.option_c_img == null) ||
                questionlist?.option_c_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'c' && questionlists?.my_answer == 'c'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'c'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'c' &&
                                  questionlists?.my_answer != 'c'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.c &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.c * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_c)}
                          <span>
                            {`${
                              questionlists?.options_count?.c &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.c * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>

                      {questionlist?.option_c_img ? (
                        <img
                          src={handleImageUrl(questionlist?.option_c_img)}
                          className="option-image"
                          alt="option_b_img"
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                )}

                {questionlist?.option_d == null ||
                (questionlist?.option_d == '' &&
                  questionlist?.option_d_img == null) ||
                questionlist?.option_d_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'd' && questionlists?.my_answer == 'd'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'd'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'd' &&
                                  questionlists?.my_answer != 'd'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.d &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.d * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_d)}
                          <span>
                            {`${
                              questionlists?.options_count?.d &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.d * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>

                      {questionlist?.option_d_img ? (
                        <img
                          src={handleImageUrl(questionlist?.option_d_img)}
                          className="option-image"
                          alt="option_d_img"
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                )}

                {questionlist?.option_e == null ||
                (questionlist?.option_e == '' &&
                  questionlist?.option_e_img == null) ||
                questionlist?.option_e_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'e' && questionlists?.my_answer == 'e'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'e'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'e' &&
                                  questionlists?.my_answer != 'e'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.e &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.e * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_e)}
                          <span>
                            {`${
                              questionlists?.options_count?.e &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.e * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>

                      {questionlist?.option_e_img ? (
                        <img
                          src={handleImageUrl(questionlist?.option_e_img)}
                          className="option-image"
                          alt="option_e_img"
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                )}

                {questionlist?.option_f == null ||
                (questionlist?.option_f == '' &&
                  questionlist?.option_f_img == null) ||
                questionlist?.option_f_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'f' && questionlists?.my_answer == 'f'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'f'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'f' &&
                                  questionlists?.my_answer != 'f'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.f &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.f * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_f)}
                          <span>
                            {`${
                              questionlists?.options_count?.f &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.f * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>

                      {questionlist?.option_f_img ? (
                        <img
                          src={handleImageUrl(questionlist?.option_f_img)}
                          className="option-image"
                          alt="option_f_img"
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                )}

                {questionlist?.option_g == null ||
                (questionlist?.option_g == '' &&
                  questionlist?.option_g_img == null) ||
                questionlist?.option_g_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'g' && questionlists?.my_answer == 'g'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'g'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'g' &&
                                  questionlists?.my_answer != 'g'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.g &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.g * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_g)}
                          <span>
                            {`${
                              questionlists?.options_count?.g &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.g * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>

                      {questionlist?.option_g_img ? (
                        <img
                          src={handleImageUrl(questionlist?.option_g_img)}
                          className="option-image"
                          alt="option_g_img"
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                )}

                {questionlist?.option_h == null ||
                (questionlist?.option_h == '' &&
                  questionlist?.option_h_img == null) ||
                questionlist?.option_h_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'h' && questionlists?.my_answer == 'h'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'h'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'h' &&
                                  questionlists?.my_answer != 'h'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.h &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.h * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_h)}
                          <span>
                            {`${
                              questionlists?.options_count?.h &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.h * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>

                      {questionlist?.option_h_img ? (
                        <img
                          src={handleImageUrl(questionlist?.option_h_img)}
                          className="option-image"
                          alt="option_h_img"
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                )}

                {questionlist?.option_i == null ||
                (questionlist?.option_i == '' &&
                  questionlist?.option_i_img == null) ||
                questionlist?.option_i_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'i' && questionlists?.my_answer == 'i'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'i'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'i' &&
                                  questionlists?.my_answer != 'i'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.i &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.i * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_i)}
                          <span>
                            {`${
                              questionlists?.options_count?.i &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.i * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>

                      {questionlist?.option_i_img ? (
                        <img
                          src={handleImageUrl(questionlist?.option_i_img)}
                          className="option-image"
                          alt="option_i_img"
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                )}

                {questionlist?.option_j == null ||
                (questionlist?.option_j == '' &&
                  questionlist?.option_j_img == null) ||
                questionlist?.option_j_img == '' ? (
                  ''
                ) : (
                  <>
                    <li>
                      <div className="new-process-bar">
                        <div className="nnw-pcs">
                          <ProgressBar
                            variant={
                              questionlists?.question_list?.correct_answer ==
                                'j' && questionlists?.my_answer == 'j'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer == 'j'
                                ? 'greencolor'
                                : questionlists?.question_list
                                    ?.correct_answer != 'j' &&
                                  questionlists?.my_answer != 'j'
                                ? 'graycolor'
                                : 'redcolor'
                            }
                            style={{
                              color: 'white',
                              marginBottom: '5px',
                            }}
                            now={
                              questionlists?.options_count?.j &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.j * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }
                          />
                        </div>
                        <p className="pp">
                          {parse(questionlist?.option_j)}
                          <span>
                            {`${
                              questionlists?.options_count?.j &&
                              questionlists?.total_question_attempt_user
                                ? (
                                    (questionlists?.options_count?.j * 100) /
                                    questionlists?.total_options_count
                                  )?.toFixed()
                                : '0'
                            }%`}
                          </span>
                        </p>
                      </div>

                      {questionlist?.option_j_img ? (
                        <img
                          src={handleImageUrl(questionlist?.option_j_img)}
                          className="option-image"
                          alt="option_j_img"
                        />
                      ) : (
                        ''
                      )}
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          <Row>
            <Col md={12}>
              <div style={{ marginLeft: '50px' }}>
                <span style={{ cursor: 'pointer' }}>
                  <AiTwotoneLike
                    fontSize="30px"
                    color="green"
                    onClick={(e) => AddLike(e, 1)}
                  />
                  {questionLikeUnlike?.like}
                </span>
                <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                  <AiTwotoneDislike
                    fontSize="30px"
                    color="red"
                    onClick={(e) => AddLike(e, 2)}
                  />
                  {questionLikeUnlike?.dislike}
                </span>
              </div>
              <hr />
            </Col>
          </Row>

          {questionlist?.explanation && (
            <div className="  p-2 ">
              <h2>Answer Explanation </h2>
              {parse(questionlist?.explanation)}
            </div>
          )}
          <hr />
          {questionlist?.explanation_video && (
            <div className=" p-2 ">
              <h2>Explanation Video</h2>
              <video width="320" height="240" controls>
                <source
                  src={`${process.env.REACT_APP_SPACES_URL}/${questionlist?.explanation_video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="p-2 mt-5">
            <h5>
              The correct answer is:
              <b>
                {questionlists?.question_list?.correct_answer?.toUpperCase()}
              </b>
            </h5>

            <h6 className="text-star mt-5">
              Rate Explanation: <span style={{ marginLeft: '5px' }}> </span>
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
              <span>You gave a {rating} star rating to this question</span>
            )}
          </div>

          <div className=" p-2 mt-5 ">
            <h5>Add Comment</h5>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showName}
                  onChange={(e) => setnametrue(!showName)}
                />
              }
              label="Show my Name"
            />
            <br />
            {showName && (
              <input
                type="text"
                className="comment_div"
                name="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
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
            {message && (
              <button className="next-btnss" onClick={AddComment}>
                Post Comment
              </button>
            )}
          </div>
          <hr />

          <div className="px-4">
            <h2 className="mb-4">Comments</h2>
            {questionlists?.question_list?.comments?.map((comment, i) => (
              <div className="mb-4 ">
                <div className="com-user-profile">
                  <div className="d-flex">
                    <div className="user-profile-img">
                      <img
                        style={{ borderRadius: '100%' }}
                        src={
                          comment?.profile_photo_path != null
                            ? handleImageUrl(comment?.profile_photo_path)
                            : '/images/avatar.png'
                        }
                        alt="user"
                      />
                    </div>
                    <p>
                      {comment?.is_name_display == 1
                        ? comment?.user_name
                        : 'User'}
                    </p>
                  </div>

                  <div>
                    <span>{moment(comment?.created_at).format('LL')}</span>
                  </div>
                </div>

                <span>
                  <div className="link-dislike-section">
                    <span className="span-avg" style={{ cursor: 'pointer' }}>
                      <AiOutlineArrowUp
                        fontSize="30px"
                        color="green"
                        onClick={(e) =>
                          AddLikeToComment(e, comment?.comment_id, 'like')
                        }
                      />
                      {comment?.likeCount}
                    </span>
                    <span
                      className="span-avg"
                      style={{ marginLeft: '10px', cursor: 'pointer' }}
                    >
                      <AiOutlineArrowDown
                        fontSize="30px"
                        color="red"
                        onClick={(e) =>
                          AddLikeToComment(e, comment?.comment_id, 'dislike')
                        }
                      />
                      {comment?.disLikeCount}
                    </span>
                  </div>
                </span>
                <span className="desc-user-1">
                  {comment.comment}
                  <br />
                  <br />
                  {comment?.adminReply &&
                    comment?.adminReply?.length > 0 &&
                    comment?.adminReply?.map((reply, ii) => (
                      <>
                        <div style={{ paddingLeft: '60px' }}>
                          <div className="com-user-profiles">
                            <div className="user-profile-img">
                              <img
                                src={
                                  reply?.user?.profile_photo_path != null
                                    ? handleImageUrl(
                                        reply?.user?.profile_photo_path
                                      )
                                    : '/images/avatar.png'
                                }
                                alt="user"
                                style={{ borderRadius: '100%' }}
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
                              />
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
                                  AddLikeToComment(e, reply?.id, 'dislike')
                                }
                              />
                              {reply?.disLikeCount}
                            </span>
                          </div>
                        </div>
                      </>
                    ))}
                  <hr />
                </span>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
