import { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { AiTwotoneLike, AiTwotoneDislike } from 'react-icons/ai';
import { handleImageUrl } from '@/lib/utils';
import {
  addTutorialComment,
  addTutorialCommentLike,
} from '@/requests/tutorial';
import React, { useEffect } from 'react';
export default function CommentVideo(props) {
  const [notes, setNote] = useState('');
  const [fordm, Setform] = useState(false);
  const [endvalue, Setendvalue] = useState(2);
  const [updatedData, setUpdatedData] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const handleSubmit = async () => {
    try{
      await addTutorialComment(props.tutorial_id, notes);
      Setform(false);
      setNote('');

      fetchUpdatedData();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get(
          `${baseUrl}/api/user/995/tutorials/${props.tutorial_id}/comments`
      );
      const newData = response.data.userTutorialNotes;

      // Reverse the order of comments to display the newest at the top
      const reversedData = newData.reverse();
      //console.log(reversedData);
      setUpdatedData(reversedData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchUpdatedData();
  }, [props.user_detail?.id, props.tutorial_id]);

  let commentList = props?.maindata;

  const readmore = () => {
    Setendvalue(endvalue + 2);
  };

  const AddLikeToComment = async (e, id, type) => {
    e.preventDefault();
    await addTutorialCommentLike(id, type);
  };

  return (
    <div>
      <div>
        <h4 className="click-btm" onClick={() => Setform(true)}>
          {props.label}
        </h4>

        {fordm ? (
          <>
            <textarea
              style={{
                width: '100%',
                height: '10rem',
                outline: 0,
                border: '3px solid lightgrey',
              }}
              onChange={(e) => setNote(e.target.value)}
            />

            <Button className="click-btm" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        ) : (
          ''
        )}
      </div>
      <hr />
      {updatedData && updatedData.length > 0 ? (
          <>
            {updatedData.slice(0, endvalue).reverse().map((val, i) => (
                <div className="mb-4" key={val.id}>
                  <div className="com-user-profile">
                    <div className="d-flex">
                      <div className="user-profile-img">
                        <img
                            style={{ borderRadius: '100%' }}
                            src={
                                val?.user?.profile_photo_path != null &&
                                handleImageUrl(val?.user?.profile_photo_path)
                            }
                            alt="user"
                        />
                      </div>
                      <p>{val?.user?.name}</p>
                    </div>
                    <div>
                      <span>{moment(val?.created_at).format('LL')}</span>
                    </div>
                  </div>
                  <span>
              <div className="link-dislike-section">
                <span className="span-avg" style={{ cursor: 'pointer' }}>
                  <AiTwotoneLike
                      fontSize="30px"
                      color="green"
                      onClick={(e) => AddLikeToComment(e, val?.id, 'like')}
                  />{' '}
                  {val?.likecount}
                </span>
                <span
                    className="span-avg"
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                >
                  <AiTwotoneDislike
                      fontSize="30px"
                      color="red"
                      onClick={(e) => AddLikeToComment(e, val?.id, 'unlike')}
                  />{' '}
                  {val?.unlikecount}
                </span>
              </div>
            </span>
                  <span className="desc-user-1">
              {val.comment}
                    <br />
              <br />
                    {val?.adminComment && val?.adminComment?.length > 0
                        ? val?.adminComment?.map((reply, ii) => (
                            <div style={{ paddingLeft: '42px' }} key={reply.id}>
                              <div className="com-user-profiles">
                                <div className="user-profile-img">
                                  <img
                                      src={
                                          reply?.user?.profile_photo_path != null &&
                                          handleImageUrl(reply?.user?.profile_photo_path)
                                      }
                                      alt="user"
                                      style={{ borderRadius: '100%' }}
                                  />
                                </div>
                                <p>Admin</p>
                              </div>
                              <span style={{ paddingLeft: '60px' }}>
                        {reply?.comment}
                      </span>
                              <div className="link-dislike-section">
                              <span
                                  className="span-avg"
                                  style={{ cursor: 'pointer' }}
                              >
                              <AiTwotoneLike
                                  fontSize="30px"
                                  color="green"
                                  onClick={(e) =>
                                      AddLikeToComment(e, reply?.id, 'like')
                                  }
                              />
                              {reply?.likecount}
                              </span>
                                <span
                                    className="span-avg"
                                    style={{
                                      marginLeft: '10px',
                                      cursor: 'pointer',
                                    }}
                                >
                                <AiTwotoneDislike
                                    fontSize="30px"
                                    color="red"
                                    onClick={(e) =>
                                        AddLikeToComment(e, reply?.id, 'dislike')
                                    }
                                />
                                  {reply?.unlikecount}
                                </span>
                              </div>
                            </div>
                        ))
                        : ''}
                    <hr />
                  </span>
                      </div>
                  ))}
                  {endvalue < updatedData.length && (
                      <button className="read-more-btn-1" onClick={readmore}>
                        Read More
                      </button>
                  )}
                </>
      ) : (
      <div>
        {commentList &&
          commentList?.slice(0, endvalue).map((val, i) => (
            <div className="mb-4" key={Math.random()}>
              <div className="com-user-profile">
                <div className="d-flex">
                  <div className="user-profile-img">
                    <img
                      style={{ borderRadius: '100%' }}
                      src={
                        val?.user?.profile_photo_path != null &&
                        handleImageUrl(val?.user?.profile_photo_path)
                      }
                      alt="user"
                    />
                  </div>
                  <p>{val?.user?.name}</p>
                </div>

                <div>
                  <span>{moment(val?.created_at).format('LL')}</span>
                </div>
              </div>

              <span>
                <div className="link-dislike-section">
                  <span className="span-avg" style={{ cursor: 'pointer' }}>
                    <AiTwotoneLike
                      fontSize="30px"
                      color="green"
                      onClick={(e) => AddLikeToComment(e, val?.id, 'like')}
                    />{' '}
                    {val?.likecount}
                  </span>
                  <span
                    className="span-avg"
                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                  >
                    <AiTwotoneDislike
                      fontSize="30px"
                      color="red"
                      onClick={(e) => AddLikeToComment(e, val?.id, 'unlike')}
                    />{' '}
                    {val?.unlikecount}
                  </span>
                </div>
              </span>
              <span className="desc-user-1">
                {val.comment}
                <br />
                <br />
                {val?.adminComment && val?.adminComment?.length > 0
                  ? val?.adminComment?.map((reply, ii) => (
                      <>
                        <div style={{ paddingLeft: '42px' }}>
                          <div className="com-user-profiles">
                            <div className="user-profile-img">
                              <img
                                src={
                                  reply?.user?.profile_photo_path != null &&
                                  handleImageUrl(
                                    reply?.user?.profile_photo_path
                                  )
                                }
                                alt="user"
                                style={{ borderRadius: '100%' }}
                              />
                            </div>
                            <p>Admin</p>
                          </div>

                          <span style={{ paddingLeft: '60px' }}>
                            {reply?.comment}
                          </span>

                          <div className="link-dislike-section">
                            <span
                              className="span-avg"
                              style={{ cursor: 'pointer' }}
                            >
                              <AiTwotoneLike
                                fontSize="30px"
                                color="green"
                                onClick={(e) =>
                                  AddLikeToComment(e, reply?.id, 'like')
                                }
                              />
                              {reply?.likecount}
                            </span>
                            <span
                              className="span-avg"
                              style={{
                                marginLeft: '10px',
                                cursor: 'pointer',
                              }}
                            >
                              <AiTwotoneDislike
                                fontSize="30px"
                                color="red"
                                onClick={(e) =>
                                  AddLikeToComment(e, reply?.id, 'dislike')
                                }
                              />
                              {reply?.unlikecount}
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
          {endvalue >= commentList?.length ? (
            ''
          ) : (
          <button className="read-more-btn-1" onClick={readmore}>
            Read More
          </button>
        )}
      </div>
      )}
    </div>
  );
}
