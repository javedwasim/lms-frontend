'use client';

import { Col, Container, Row } from 'react-bootstrap';

import Header from '@/components/Auth/Header';

import '@/styles/login.css';

export default function AuthLayout({ children }) {
  return (
    <div>
      <Header />

      <div className="box-card login-section">
        <Container>
          <Row>
            <Col md={12}>
              <div className="mind-login">
                <div className="login-logo text-center">
                  <img src="/images/login-screen-logo.png" />
                </div>

                {children}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
