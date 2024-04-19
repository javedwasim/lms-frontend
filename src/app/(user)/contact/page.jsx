'use client';

import { Col, Container, Row } from 'react-bootstrap';

import '@/styles/Contact.css';

export default function Profile() {
  return (
    <div className="hero-section mt-5">
      <Container>
        <div>
          <center>
            <h2 className="mb-5"> Contact Us</h2>
          </center>
          <Row>
            <Col itme md={4}>
              <div className="contact-detail ">
                <div className="conct-img">
                  <img src="/icons/whatsapp.svg" alt="whatsapp" />
                </div>
                <h3>Whatsapp</h3>
                <a
                  href={`https://wa.link/7lzauc`}
                  data-action="share/whatsapp/share"
                  target="_blank"
                  style={{ color: 'black' }}
                >
                  +442033059593
                </a>
                <p></p>
              </div>
            </Col>
            <Col itme md={4}>
              <div className="contact-detail">
                <div className="conct-img">
                  <img src="/icons/contact-book.svg" alt="location" />
                </div>
                <h3>Contact</h3>
                <p>
                  <a href="tel:+442033059593">+442033059593</a>
                </p>
              </div>
            </Col>
            <Col itme md={4}>
              <div className="contact-detail">
                <div className="conct-img">
                  <img src="/icons/email.svg" alt="location" />
                </div>
                <h3>Email</h3>
                <p>
                  <a href={`mailto:info@studymind.co.uk?subject=LMS Support`}>
                    info@studymind.co.uk
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
