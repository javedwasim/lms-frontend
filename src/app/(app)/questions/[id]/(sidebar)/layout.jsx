'use client';

import Header from '@/components/Auth/Header';
import Sidebar from '@/components/Dashboard/Sidebar';

export default function Layout({ children, params }) {
  const { id } = params;

  return (
    <div>
      <Header />
      <div className="box-card">
        <Sidebar
          is_question_number={'1'}
          is_Tutorial={'1'}
          is_Test={'1'}
          courseId={id}
        />

        {children}
      </div>
    </div>
  );
}
