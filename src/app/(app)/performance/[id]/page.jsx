'use client';
import { useRef } from 'react';
import _ from 'lodash';
import ReactToPrint from 'react-to-print';
import { CircularProgress } from '@mui/material';
import { ComponentToPrint } from '@/components/Performance/ComponentToPrint';

import '@/styles/DashboardSidebar.css';
import '@/styles/Questions.css';
import '@/styles/index.css';

import { usePerformanceReport } from '@/hooks/performance';

const Backend_Data = ({ params }) => {
  const { id } = params;

  const { data } = usePerformanceReport(id);

  let summaryData = _.groupBy(data, (item) => item.course_detail.id);
  summaryData = Object.keys(summaryData).map((courseId) => {
    return summaryData[courseId][0].course_detail;
  });

  const componentRef = useRef();

  return (
    <div>
      {data ? (
        <>
          <div className="medic-header">
            <img
              style={{ width: '147px', height: '45px' }}
              src="/images/study-mind-logo.png"
              className="float-left mx-5"
            />
            <center>
              <h2>Study Mind Student Report</h2>
            </center>

            <ReactToPrint
              trigger={() => (
                <button className="test-start-btn-save float-end mx-5 mb-2">
                  Save As Pdf
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
          <hr />
          <ComponentToPrint
            ref={componentRef}
            Course_Details={data}
            SummaryData={summaryData}
          />
        </>
      ) : (
        <center>
          <CircularProgress fontSize={30} />
        </center>
      )}
    </div>
  );
};

export default Backend_Data;
