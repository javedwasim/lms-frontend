'use client';

import { useState } from 'react';
import Link from 'next/link';

import { handleImageUrl, truncate } from '@/lib/utils';

import Slider from 'react-slick';
import parse from 'html-react-parser';
import { Col, Row } from 'react-bootstrap';
import { Box } from '@mui/material';
import Loader from '@/components/Loader/Loader';

import '@/styles/Seminar.css';

import { usePageDetails } from '@/hooks/page';

export default function Books() {
  const { data, isLoading } = usePageDetails('book');

  const headerdata = data?.basicDetail;
  const bookList = data?.list;
  const testimonial = data?.testimonial;

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  };

  const [expand, setExpand] = useState(null);

  const expandRow = (id) => {
    if (id === expand) {
      setExpand(null);
    } else {
      setExpand(id);
    }
  };

  if (isLoading || !data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Loader />;
      </Box>
    );
  }

  return (
    <div className="hero-section p-0">
      <div className="seminars-section-heading">
        <h3>{headerdata?.main_title}</h3>
        <p>{headerdata?.sub_title}</p>
      </div>
      <div className="seminar-book">
        <Row>
          <Col md={3}>
            <div className="semi-serce">
              <div className="semi-icon">
                <img
                  src={handleImageUrl(headerdata?.section_icon_1)}
                  alt="img-icon"
                />
              </div>
              <h4>{headerdata?.section_title_1}</h4>
              <p>{headerdata?.section_description_1}</p>
            </div>
            <div className="semi-serce mt-100">
              <div className="semi-icon">
                <img
                  src={handleImageUrl(headerdata?.section_icon_2)}
                  alt="img-icon"
                />
              </div>
              <h4>{headerdata?.section_title_2}</h4>
              <p>{headerdata?.section_description_2}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="vactor-img">
              <img src={handleImageUrl(headerdata?.center_image)} alt="img" />
            </div>
            <div className="semi-serce speed-serc">
              <div className="semi-icon">
                <img
                  src={handleImageUrl(headerdata?.section_icon_3)}
                  alt="img-icon"
                />
              </div>
              <h4>{headerdata?.section_title_3}</h4>
              <p>{headerdata?.section_description_3}</p>
            </div>
          </Col>
          <Col md={3}>
            <div className="semi-serce">
              <div className="semi-icon">
                <img
                  src={handleImageUrl(headerdata?.section_icon_4)}
                  alt="img-icon"
                />
              </div>
              <h4>{headerdata?.section_title_4}</h4>
              <p>{headerdata?.section_description_4}</p>
            </div>
            <div className="semi-serce mt-100">
              <div className="semi-icon">
                <img
                  src={handleImageUrl(headerdata?.section_icon_5)}
                  alt="img-icon"
                />
              </div>
              <h4>{headerdata?.section_title_5}</h4>
              <p>{headerdata?.section_description_5}</p>
            </div>
          </Col>
        </Row>
        <div className="seminar-booking text-center">
          <a href="#seminar1">Browse Books</a>
        </div>
      </div>

      <div className="testmonial-slider">
        {testimonial && testimonial?.length == 1 ? (
          <div>
            <div className="testmonial">
              <p>“{testimonial[0] && testimonial[0]?.testimonial}”</p>
              <div className="student-feedback">
                <h5>
                  <strong>
                    {testimonial[0] && testimonial[0]?.submited_by}
                  </strong>
                </h5>
                <h5>{testimonial[0] && testimonial[0]?.position}</h5>
              </div>
            </div>
          </div>
        ) : (
          <Slider {...settings}>
            {testimonial?.map((val, i) => (
              <>
                <div key={i}>
                  <div className="testmonial">
                    <p>“{val?.testimonial}”</p>
                    <div className="student-feedback">
                      <h5>
                        <strong>{val?.submited_by}</strong>
                      </h5>
                      <h5>{val?.position}</h5>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </Slider>
        )}
      </div>
      <div className="first-seminar" id="seminar1">
        <div className="container">
          <div className="seminars-section-heading">
            <h3>Start learning with our books </h3>
            <p>Browse our award-winning revision guides and books</p>
          </div>
          <Row>
            {bookList &&
              bookList.map((book, i) => (
                <>
                  <Col md={6}>
                    <div
                      className="pre-recored-book"
                      style={{
                        height: book?.id == expand ? '98%' : '',
                        background: book?.background_gradient
                          ? book?.background_gradient
                          : 'linear-gradient(60.47deg, #8300EC 22.7%, #B300CF 69.08%)',
                      }}
                    >
                      <div className="profile-user-active">
                        <div className="user-profile-icon">
                          <div className="icons">
                            {book?.tutor && (
                              <img
                                src={handleImageUrl(
                                  book?.tutor[0]?.tutor_image
                                )}
                                alt="tutor-img"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="course-name-st py-4">
                        <span>{book?.sub_title}</span>
                        <h3>{book?.title}</h3>
                        <p></p>
                      </div>
                      <div className="btn-btn-read-book">
                        <Link href={`/plan/${book.id}/4`}>Buy Now</Link>
                        <button
                          onClick={() => expandRow(book?.id)}
                          style={{
                            display: book?.id == expand ? 'none' : 'inline',
                          }}
                        >
                          Read More
                        </button>
                      </div>
                      <div
                        className={
                          book?.id == expand ? 'learn-active' : 'learn-expand'
                        }
                      >
                        <h3>OUR TUTORS</h3>
                        <div className="user-read">
                          {book?.tutor &&
                            book?.tutor.map((va, ifx) => (
                              <div className="profile-user-active" key={ifx}>
                                <div className="our-tutors">
                                  <div className="icons">
                                    <img
                                      src={handleImageUrl(va?.tutor_image)}
                                      alt="tutor_image"
                                    />
                                  </div>
                                  <span>{va?.tutor_name}</span>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="st-what">
                          <h4>WHAT STUDENTS HAVE SAID</h4>
                          <p>
                            “
                            {book?.testimonial &&
                              book?.testimonial[0]?.testimonial}
                            ”
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div
                      className="recored-detail"
                      style={{
                        height: book?.id == expand ? '98%' : '',
                      }}
                    >
                      <div className="full-screen-icon">
                        {book?.id == expand ? (
                          <img
                            src="/icons/fullscreen.png"
                            onClick={() => expandRow(book?.id)}
                          />
                        ) : (
                          <img
                            src="/icons/zoom-out.svg"
                            onClick={() => expandRow(book?.id)}
                          />
                        )}
                      </div>
                      <div
                        className={
                          book?.id == expand ? 'exapand-more' : 'exapand-less'
                        }
                      >
                        {book?.description && parse(book?.description)}
                      </div>

                      {book?.id == expand ? (
                        ''
                      ) : (
                        <p>{truncate(book?.description, 120)}</p>
                      )}

                      <h4>IN THIS BOOK</h4>
                      <ul>
                        {book?.add_ons &&
                          book?.add_ons.map((value, inf) => (
                            <li>
                              {' '}
                              <i>
                                <img src="/icons/green-tick.png" />
                              </i>{' '}
                              {value?.description}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </Col>
                </>
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
}
