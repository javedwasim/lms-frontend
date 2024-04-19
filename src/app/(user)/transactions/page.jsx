'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

import '@/styles/TutorialCategory.css';
import '@/styles/DashboardSidebar.css';

import Courses from '@/components/User/Transactions/Courses';
import Seminars from '@/components/User/Transactions/Seminars';
import Books from '@/components/User/Transactions/Books';
import Flashcards from '@/components/User/Transactions/Flashcards';
import { fetchTransactions } from '@/requests/transactions';

export default function Transactions() {
  const [tab, setTab] = useState('course');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [transactions, setTransactions] = useState([]);

  const checkFilter = () => {};

  const handleChangeTab = (k) => {
    setTab(k);
  };

  useEffect(() => {
    fetchTransactions(tab, startDate, endDate).then((res) => {
      setTransactions(res);
    });
  }, [tab]);

  return (
    <div className="hero-section">
      <Container>
        <Row>
          <Col md={5}>
            <input
              type="date"
              className="date-type w-100"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Col>
          <Col md={5}>
            <input
              type="date"
              className="date-type w-100"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <button onClick={checkFilter} className="test-start-btnss">
              Search
            </button>
          </Col>
        </Row>
        <Tabs
          defaultActiveKey="course"
          transition={true}
          id="noanim-tab-example"
          className="mb-3 p-0 transcript add-comt-note trns-sheet"
          onSelect={(k) => handleChangeTab(k)}
        >
          <Tab eventKey="course" title="Courses">
            <Courses transactions={transactions} />
          </Tab>
          <Tab eventKey="seminar" title="Seminars">
            <Seminars transactions={transactions} />
          </Tab>
          <Tab eventKey="book" title="Books">
            <Books transactions={transactions} />
          </Tab>
          <Tab eventKey="flashcard" title="Flashcards">
            <Flashcards transactions={transactions} />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}
