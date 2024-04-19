'use client';

import Header from '@/components/Auth/Header';
import Sidebar from '@/components/Home/Sidebar';

import '@/styles/Dashboard.css';
import '@/styles/home.css';

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="box-card">
          <Sidebar />
          {children}
        </div>
      </div>
    </>
  );
}
