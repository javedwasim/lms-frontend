'use client';

import Link from 'next/link';

import Header from '@/components/Auth/Header';
import Sidebar from '@/components/Dashboard/Sidebar';

import { useAuth } from '@/hooks/auth';
import { useMockTests } from '@/hooks/mockTest';
import { useCourseDetails } from '@/hooks/course';
import Swal from 'sweetalert2';
import { Col, Container, Row } from 'react-bootstrap';

export default function MockTest({ params }) {
  const courseId = parseInt(params.courseId);

  const { user } = useAuth({ middleware: 'auth' });

  const { data: mockTests, isLoading } = useMockTests(courseId);
  const { data: orderDetails } = useCourseDetails(courseId);

  const handleMockTestClick = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Unlock Course',
      text: 'Please unlock this course to access the Mock Test.',
    });
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="box-card">
          <Sidebar
            is_question_number={'1'}
            is_Tutorial={'1'}
            is_Test={'1'}
            courseId={courseId}
          />
          <div className="hero-section">
            <Container fluid>
              <div>
                <Row>
                  <Col item md={12}>
                    <div className="section-heading">
                      <h2>Mock Test</h2>
                    </div>
                  </Col>
                </Row>

                {!isLoading && (
                  <Row>
                    {mockTests && mockTests.length > 0 ? (
                      mockTests.map((mockTest, i) => (
                        <Col item md={6} lg={4} sm={12}>
                          <div className="featured-courses featured-section-title mang-heigt">
                            {orderDetails?.is_package_purchased ? (
                              <div className="courses-img">
                                <Link
                                  href={`/mock-test/${courseId}/category/${mockTest.id}`}
                                >
                                  <img src={mockTest?.image} alt-bg img />
                                </Link>
                              </div>
                            ) :
                                <div className="courses-img">
                                  <img src={mockTest?.image} alt-bg img onClick={() => {
                                    handleMockTestClick();
                                  }}
                                  />
                                </div>
                            }
                            <h3>
                              {mockTest?.name?.substr(0, 40)}
                              {mockTest?.name?.substring(40) ? <>....</> : ''}
                            </h3>
                            <div className="button-buy mb-3">
                              {orderDetails?.is_package_purchased ? (
                                <Link
                                  href={`/mock-test/${courseId}/category/${mockTest.id}`}
                                >
                                  {mockTest?.resumes?.length === 0 && (
                                    <button> Start Test </button>
                                  )}

                                  {mockTest?.resumes?.length > 0 && (
                                    <button> Resume Test </button>
                                  )}
                                </Link>
                              ) : (
                                <Link href={`/plan/${courseId}/1`}>
                                  <button>Unlock Mock</button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </Col>
                      ))
                    ) : (
                      <h4>No Mock Test Available Now</h4>
                    )}
                  </Row>
                )}
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
