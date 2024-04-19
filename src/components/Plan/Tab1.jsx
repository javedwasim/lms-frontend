import { useState } from 'react';
import Link from 'next/link';

import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { useCourses } from '@/hooks/course';
import { usePackages } from '@/hooks/package';
import { addCartItem } from '@/requests/cart';

export default function Tab1({ setTab, id, type }) {
  const { data: courses } = useCourses();
  const { data: packages } = usePackages(id, type); // hardcoding record_type to 1

  const [selectedPackageId, setSelectedPackage] = useState(null);

  const addToCart = async () => {
    await addCartItem(type, id, selectedPackageId);
    setTab(2);
  };

  if (!courses || !packages) return <div>Loading...</div>;

  const course = courses.find((course) => course.id === id);

  return (
    <div>
      <Container fluid>
        {type === 1 && (
          <Row>
            <Col md={12}>
              <div className="packages-heading text-center">
                <h2>{course?.name}</h2>
                <div className="featured-courses min-height-auto box-shadow-none border-0">
                  <ul>
                    <li>
                      <Link href="/">
                        <img src="/icons/lessons.svg" alt="img" />
                        {course?.noOfLessons} Lessons
                      </Link>
                    </li>
                    <li>
                      <Link href="/">
                        <img
                          className="question-clock-icon"
                          src="/icons/clock.svg"
                          alt="img"
                        />
                        {course?.totalHours} Hours
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        )}

        <Row>
          {packages.map((item, i) => {
            return (
              <Col md={4} key={item.id}>
                <div
                  className={
                    selectedPackageId === item.id ? 'pack active' : 'pack'
                  }
                >
                  <div
                    className={`package-type text-center ${
                      i === 1 ? 'pack-2' : i === 2 ? 'pack-3' : ''
                    }`}
                  >
                    <h2>{item.package_title}</h2>
                  </div>

                  <div className="pack-title text-center">
                    <h3>
                      £{item.price}
                      {item?.packagetype === 'Free' && 'Free'}
                      {item?.packagetype === 'Subscription' && 'Per Month'}
                    </h3>
                  </div>

                  <div className="pack-detail">
                    <ul>
                      {item.packagemultiples &&
                      item.packagemultiples.length > 0 ? (
                        item.packagemultiples?.map((item, i) => (
                          <li key={i}>
                            {item.multi_pack_status == 1 ? (
                              <>
                                <i>
                                  <img
                                    src="/icons/check-green.svg"
                                    alt="icon"
                                  />
                                </i>
                                {item.multi_pack_value}
                              </>
                            ) : (
                              <>
                                <i>
                                  <img
                                    src="/icons/check-red.svg"
                                    alt="icon"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                    }}
                                  />
                                </i>
                                {item.multi_pack_value}
                              </>
                            )}
                          </li>
                        ))
                      ) : (
                        <p>No Data</p>
                      )}
                    </ul>
                  </div>

                  <div className="text-center select-btn">
                    <button onClick={() => setSelectedPackage(item.id)}>
                      {selectedPackageId == item.id ? (
                        <>
                          Selected <AiOutlineCheckCircle />
                        </>
                      ) : (
                        'Select'
                      )}
                    </button>

                    <Link href="/">Terms and Conditions</Link>
                  </div>
                </div>
              </Col>
            );
          })}

          <Col md={12}>
            <div className="container-btn-next text-center m-4">
              {packages && packages.length > 0 ? (
                selectedPackageId ? (
                  <button onClick={addToCart}>Continue</button>
                ) : (
                  'Please Select Package'
                )
              ) : (
                'No Packages'
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
