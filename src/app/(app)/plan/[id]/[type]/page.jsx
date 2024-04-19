'use client';

import { useState } from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import Header from '@/components/Auth/Header';
import Sidebar from '@/components/Home/Sidebar';

import '@/styles/Dashboard.css';
import '@/styles/Plan.css';
import '@/styles/Package.css';
import '@/styles/home.css';

import Tab1 from '@/components/Plan/Tab1';
import Tab2 from '@/components/Plan/Tab2';
import Tab3 from '@/components/Plan/Tab3';

export default function Plan({ params }) {
  const id = parseInt(params.id);
  const type = parseInt(params.type);

  const [tab, setTab] = useState(1);
  const [set, isSet] = useState(false);

  return (
    <div>
      <Header />
      <Container fluid>
        <div className="box-card">
          <Sidebar />
          <div className="hero-section">
            <Row>
              <Col md={4}></Col>
              <Col md={4}>
                <div className="count-tab">
                  <ul>
                    <li>
                      <p
                        className={`${
                          tab === 1
                            ? 'activeTab'
                            : tab === 2 || tab === 3
                            ? 'pre-value'
                            : ''
                        } packageTab`}
                      >
                        <span>1</span>
                      </p>
                      Select Package
                    </li>
                    <li>
                      <p
                        className={`${
                          tab === 2 ? 'activeTab' : tab === 3 ? 'pre-value' : ''
                        } packageTab`}
                      >
                        <span>2</span>
                      </p>
                      Add Courses
                    </li>
                    <li>
                      <p
                        className={`${tab === 3 ? 'activeTab' : ''} packageTab`}
                      >
                        <span>3</span>
                      </p>
                      Checkout
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Container>
              {/* Tab 1 */}
              {tab === 1 && (
                <Tab1
                  setTab={setTab}
                  id={id}
                  set={set}
                  isSet={isSet}
                  type={type}
                />
              )}

              {/* Tab 2 */}
              {tab === 2 && (
                <Tab2
                  setTab={setTab}
                  id={id}
                  set={set}
                  isSet={isSet}
                  type={type}
                />
              )}

              {tab === 3 && (
                <Tab3 setTab={setTab} id set={set} isSet={isSet} type={type} />
              )}
            </Container>
          </div>
        </div>
      </Container>
    </div>
  );
}
