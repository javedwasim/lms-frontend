import React from 'react';
import Link from 'next/link';

import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

import { useCourses } from '@/hooks/course';
import { useCart } from '@/hooks/cart';
import { deleteCartItem } from '@/requests/cart';

export default function Tab2({ setTab, isSet, id, type }) {
  const { data: courses } = useCourses();
  const { data: cart, mutate } = useCart(type);

  const removeItem = async (e, id) => {
    await deleteCartItem(id);
    mutate();
  };

  if (!courses || !cart) {
    return <div>Loading...</div>;
  }

  let totalPrice = 0;
  totalPrice = cart.reduce(
    (acc, item) => acc + parseInt(item.package.price),
    0
  );

  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={2}>
            <button onClick={() => setTab(1)} className="submitbtns">
              <BiArrowBack /> Back
            </button>
          </Col>

          <Col md={8}>
            <div className="packages-heading text-center">
              <h2>Add more courses</h2>
            </div>
          </Col>

          {courses.map((course) => {
            return (
              <Col md={4} key={course.id}>
                <div className={`pack pb-4`}>
                  <div className="top-bg">
                    <img src="/images/bg-1.png" alt="bg" />
                  </div>
                  <div className="pack-title text-center mb-2 border-0">
                    <h3 className="mt-3">{course.name}</h3>
                  </div>
                  <div className="text-center select-btn">
                    {cart.some((cartCourse) => {
                      return cartCourse.courseId === course.id;
                    }) ? (
                      <button className="added m-0">
                        Added <AiOutlineCheckCircle />
                      </button>
                    ) : id === course.id ? (
                      <button
                        className="m-0"
                        onClick={() => isSet((prev) => !prev)}
                      >
                        Add Course
                      </button>
                    ) : (
                      <Link href={`/plan/${course.id}/1`}>
                        <button className="m-0">Add Course</button>
                      </Link>
                    )}
                  </div>
                </div>
              </Col>
            );
          })}

          {cart && cart.length > 0 && (
            <Col md={12}>
              <div className="container-btn-next text-center m-4">
                <button onClick={() => setTab(3)}>CHECKOUT</button>
              </div>
            </Col>
          )}

          <Col md={12}>
            <div className="payment-detail text-center">
              <h4>Your selection</h4>
              {cart &&
                cart.length > 0 &&
                cart.map((item, i) => (
                  <React.Fragment key={item.id}>
                    <p>
                      <strong className="title-pc">{item?.courseName}</strong>|
                      <span className="title-pc-1">
                        {item?.package?.package_title}
                      </span>
                      |
                      <span className="title-pc-2">
                        £{item?.package?.price}
                      </span>
                      {id === item?.courseId ? (
                        <>
                          <button onClick={() => setTab(1)}> Modify</button>
                          <button onClick={(e) => removeItem(e, item?.id)}>
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href={`/plan/${item?.courseId}/1`}>
                            <button>Modify</button>
                          </Link>
                          <button onClick={(e) => removeItem(e, item?.id)}>
                            Remove
                          </button>
                        </>
                      )}
                    </p>
                  </React.Fragment>
                ))}
              <p>
                <strong>
                  Total <span>| £{totalPrice}</span>
                </strong>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
