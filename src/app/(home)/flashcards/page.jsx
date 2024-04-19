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

export default function Flashcards() {
  const { data, isLoading } = usePageDetails('flashcard');

  const headerdata = data?.basicDetail;
  const flashcardList = data?.list;
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
          <a href="#seminar1">Browse Flashcards</a>
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
            <h3>Start learning with our flashcards</h3>
            <p>Enroll in your first deck to begin learning for your exams</p>
          </div>
          <Row>
            {flashcardList &&
              flashcardList.map((flashcard, i) => (
                <>
                  <Col md={6}>
                    <div
                      className="pre-recored-flash"
                      style={{
                        height: flashcard?.id == expand ? '98%' : '',
                        background: flashcard?.background_gradient
                          ? flashcard?.background_gradient
                          : 'linear-gradient(60.4deg, #723636 22.86%, #ff583fc2 77.16%)',
                      }}
                    >
                      <div className="profile-user-active">
                        <div className="user-profile-icon">
                          <div className="icons">
                            {flashcard?.tutor && (
                              <img
                                src={`${process.env.REACT_APP_SPACES_URL}/${flashcard?.tutor[0]?.tutor_image}`}
                                alt="tutor-img"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="course-name-st py-3">
                        <span>{flashcard?.sub_title}</span>
                        <h3>{flashcard?.title}</h3>
                      </div>
                      <div className="btn-btn-read-book">
                        <Link href={`/plan/${flashcard?.id}/3`}>Buy Now</Link>
                        <button
                          onClick={() => ExpanRow(flashcard?.id)}
                          style={{
                            display:
                              flashcard?.id == expand ? 'none' : 'inline',
                          }}
                        >
                          Learn More
                        </button>
                      </div>
                      <div
                        className={
                          flashcard?.id == expand
                            ? 'learn-active'
                            : 'learn-expand'
                        }
                      >
                        <h3>OUR TUTORS</h3>
                        <div className="user-read">
                          {flashcard?.tutor &&
                            flashcard?.tutor.map((va, ifx) => (
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
                            {flashcard?.testimonial &&
                              flashcard?.testimonial[0]?.testimonial}
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
                        height: flashcard?.id == expand ? '98%' : '',
                      }}
                    >
                      <div className="full-screen-icon">
                        {flashcard?.id == expand ? (
                          <img
                            src={fullscreen}
                            onClick={() => expandRow(flashcard?.id)}
                          />
                        ) : (
                          <img
                            src={Zoomout}
                            onClick={() => expandRow(flashcard?.id)}
                          />
                        )}
                      </div>

                      <div
                        className={
                          flashcard?.id == expand
                            ? 'exapand-more'
                            : 'exapand-less'
                        }
                      >
                        <p>
                          {flashcard?.description &&
                            parse(flashcard?.description)}
                        </p>
                      </div>
                      {flashcard?.id == expand ? (
                        ''
                      ) : (
                        <p>{truncate(flashcard?.description, 120)}</p>
                      )}
                      <h4>IN THIS FLASHCARDS</h4>
                      <ul>
                        {flashcard?.add_ons &&
                          flashcard?.add_ons.map((value, inf) => (
                            <li>
                              {' '}
                              <i>
                                <img src={Check} />
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
