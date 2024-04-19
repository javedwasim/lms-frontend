'use client';

import { useState } from 'react';
import Link from 'next/link';

import moment from 'moment';
import { handleImageUrl, truncate } from '@/lib/utils';

import Slider from 'react-slick';
import parse from 'html-react-parser';
import { Col, Row } from 'react-bootstrap';
import { Box } from '@mui/material';
import Loader from '@/components/Loader/Loader';

import '@/styles/Seminar.css';

import { usePageDetails } from '@/hooks/page';

export default function Seminars() {
  const { data, isLoading } = usePageDetails('seminar');

  const headerdata = data?.basicDetail;
  const seminarList = data?.list;
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
          <a href="#seminar1">Browse Seminars</a>
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
            <h3>Book your first seminar today</h3>
            <p>
              Our interactive sessions are designed to make preparing for exams
              more efficient
            </p>
          </div>
          <Row>
            {seminarList &&
              seminarList.map((seminar, i) => (
                <>
                  <Col md={6}>
                    <div
                      className="pre-recored"
                      style={{
                        height: seminar?.id == expand ? '98%' : '',
                        background: seminar?.background_gradient
                          ? seminar?.background_gradient
                          : 'linear-gradient(60.4deg, #FFA12A 22.86%, #FFCF3F 77.16%)',
                      }}
                    >
                      <div className="profile-user-active">
                        {seminar?.start_time === '' &&
                        seminar?.end_time === '' ? (
                          <button className="record-btn-live">LIVE</button>
                        ) : new Date(seminar?.end_time).getTime() <
                            new Date().getTime() &&
                          new Date(seminar?.start_time).getTime() <
                            new Date().getTime() ? (
                          <button className="record-btn-live">LIVE</button>
                        ) : new Date(seminar?.end_time).getTime() >
                            new Date().getTime() &&
                          new Date(seminar?.start_time).getTime() >
                            new Date().getTime() ? (
                          <button className="record-btn-live">LIVE</button>
                        ) : (
                          <button className="record-btn-live">LIVE</button>
                        )}

                        <div className="user-profile-icon">
                          <div className="icons">
                            {seminar?.tutor && (
                              <img
                                src={handleImageUrl(
                                  seminar?.tutor[0]?.tutor_image
                                )}
                                alt="tutor-img"
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="course-name-st">
                        <span>{seminar?.sub_title}</span>
                        <h3>{seminar?.title}</h3>
                        <p>
                          {seminar?.start_time
                            ? moment(seminar?.start_time).format('LLL')
                            : ''}
                        </p>
                      </div>
                      <div className="btn-btn-read-book">
                        <Link href={`/plan/${seminar?.id}/2`}>Book Now</Link>

                        <button
                          onClick={() => expandRow(seminar?.id)}
                          style={{
                            display: seminar?.id == expand ? 'none' : 'inline',
                          }}
                        >
                          Learn More
                        </button>
                      </div>
                      <div
                        className={
                          seminar?.id == expand
                            ? 'learn-active'
                            : 'learn-expand'
                        }
                      >
                        <h3>OUR TUTORS</h3>
                        <div className="user-read">
                          {seminar?.tutor &&
                            seminar?.tutor.map((va, ifx) => (
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
                            {seminar?.testimonial &&
                              seminar?.testimonial[0]?.testimonial}
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
                        height: seminar?.id == expand ? '98%' : '',
                      }}
                    >
                      <div className="full-screen-icon">
                        {seminar?.id == expand ? (
                          <img
                            src="/icons/fullscreen.png"
                            onClick={() => expandRow(seminar?.id)}
                          />
                        ) : (
                          <img
                            src="/icons/zoom-out.svg"
                            onClick={() => expandRow(seminar?.id)}
                          />
                        )}
                      </div>

                      <div
                        className={
                          seminar?.id == expand
                            ? 'exapand-more'
                            : 'exapand-less'
                        }
                      >
                        {seminar?.description && parse(seminar?.description)}
                      </div>
                      {seminar?.id == expand ? (
                        ''
                      ) : (
                        <span
                          className="span-seminar-content"
                          style={{ margin: '0' }}
                        >
                          {truncate(seminar?.description, 120)}
                        </span>
                      )}
                      <h4>IN THIS SEMINAR</h4>
                      <ul>
                        {seminar?.add_ons &&
                          seminar?.add_ons.map((value, inf) => (
                            <li>
                              <i>
                                <img src="/icons/green-tick.png" />
                              </i>
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
