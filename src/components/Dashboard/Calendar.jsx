import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { fetchCourseProgress } from '@/requests/course';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Calendar() {
  const [calenderData, setCalenderData] = useState({
    dt: new Date(),
    day: new Date(new Date().setDate(1)).getDay(),
    today: new Date(),
    endDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate(),
    prevDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      0
    ).getDate(),
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    monthenddate: new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ),
  });

  const [calendarResponse, setCalendarResponse] = useState(null);

  useEffect(() => {
    let startDate = moment(calenderData?.startDate).format('YYYY-MM-DD');
    let endDate = moment(calenderData?.monthenddate).format('YYYY-MM-DD');

    fetchCourseProgress(29, startDate, endDate).then((response) => {
      setCalendarResponse(response);
    });
  }, [calenderData]);

  const moveDate = useCallback((action) => {
    setCalenderData((prev) => {
      // upgrading the values of prev date (state) with parameter
      const predate =
        action === 'prev'
          ? new Date(prev?.dt).setMonth(prev?.dt?.getMonth() - 1)
          : new Date(prev?.dt).setMonth(prev?.dt?.getMonth() + 1);

      return {
        ...prev,
        dt: new Date(predate),
        //calculate the week day number
        day: new Date(new Date(predate).setDate(1)).getDay(),
        today: new Date(),
        // counting the day  current month
        endDate: new Date(
          new Date(predate).getFullYear(),
          new Date(predate).getMonth() + 1,
          0
        ).getDate(),
        // counting the day of last month
        prevDate: new Date(
          new Date(predate).getFullYear(),
          new Date(predate).getMonth(),
          0
        ).getDate(),
        // start date of month
        startDate: new Date(
          new Date(predate).getFullYear(),
          new Date(predate).getMonth(),
          1
        ),
        // end date of month
        monthenddate: new Date(
          new Date(predate).getFullYear(),
          new Date(predate).getMonth() + 1,
          0
        ),
      };
    });
  });

  let progressRecord = calendarResponse?.progress_record;
  let type = calendarResponse?.courseType;

  const isTutorial = '1';
  const isQuestionNumber = '1';

  return (
    <div>
      <div className="wrapper">
        <div className="calendar">
          <div className="month">
            <div className="prev" onClick={() => moveDate('prev')}>
              <span>&#10094;</span>
            </div>
            <h2 id="month">{months[calenderData?.dt.getMonth()]}</h2>
            <div className="next" onClick={() => moveDate('next')}>
              <span>&#10095;</span>
            </div>
          </div>
          <div style={{ width: '320px' }}>
            <div className="weekdays">
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
              <div>Sun</div>
            </div>
          </div>
          <div className="days">
            {calenderData?.day >= 1 &&
              Array(calenderData?.day - 1)
                ?.fill(1)
                ?.map((_, i) => {
                  return (
                    <div className="prev_date" key={i}>
                      {calenderData?.prevDate - i}
                    </div>
                  );
                })
                ?.reverse()}

            {Array(calenderData?.endDate)
              ?.fill(1)
              ?.map((_, i) => {
                return type === 'paid' ? (
                  <OverlayTrigger
                    key={i}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${i}`}>
                        <p>
                          {progressRecord &&
                            moment(progressRecord[i]?.date)?.format('LL')}
                        </p>
                        <p>
                          {isTutorial === '1' && isQuestionNumber === '' ? (
                            <strong>
                              Tutorials Completed
                              {progressRecord &&
                                progressRecord[i]?.total_question_attempt}
                            </strong>
                          ) : (
                            <strong>
                              Total Questions Attempted{' '}
                              {progressRecord &&
                                progressRecord[i]?.total_question_attempt}
                            </strong>
                          )}
                        </p>
                      </Tooltip>
                    }
                  >
                    <div
                      key={i}
                      className="calendar_data"
                      style={{
                        backgroundColor:
                          progressRecord && progressRecord[i]?.color,
                      }}
                    >
                      {i + 1}
                    </div>
                  </OverlayTrigger>
                ) : (
                  <div
                    key={i}
                    className="calendar_data"
                    style={{
                      backgroundColor:
                        progressRecord && progressRecord[i]?.color,
                    }}
                  >
                    {i + 1}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
