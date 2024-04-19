'use client';

import Header from '@/components/Auth/Header';
import Sidebar from '@/components/User/Sidebar';

import '@/styles/login.css';
import '@/styles/Profile.css';
import '@/styles/Seminar.css';
import '@/styles/Dashboard.css';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="box-card">
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
}
