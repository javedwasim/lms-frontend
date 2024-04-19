'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { useAuth } from '@/hooks/auth';
import { useNavbar } from '@/context/navbar';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import '@/styles/Sidebar.css';
import '@/styles/Dashboard.css';

export default function Sidebar({
  is_question_number,
  is_Tutorial,
  is_Test,
  courseId,
}) {
  const pathname = usePathname();

  const { user } = useAuth({ middleware: 'guest' });

  const [menuCollapse, setMenuCollapse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { navbarCollapse } = useNavbar();

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    window.addEventListener(
      'resize',
      () => {
        const isMobileWidth = window.innerWidth < 768;
        setIsMobile(isMobileWidth);
      },
      false
    );
  }, []);

  return (
    <div
      id="header"
      className={!navbarCollapse ? 'sidebar-login hello' : 'sidebar-login'}
    >
      <div
        className={menuCollapse ? 'closemenu' : 'closemenu rotateicon'}
        onClick={() => setMenuCollapse((prev) => !prev)}
      >
        <img src="/icons/arrow-icon.svg" alt="icon" />
      </div>

      <ProSidebar
        collapsed={menuCollapse}
        className={`${isMobile ? 'collapsed-mobile' : 'non-mobile-class'}`}
      >
        {user && (
          <div className="text-center mt-4 desktop-none">
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                height="50px"
                width="50px"
                style={{ borderRadius: '50px', marginRight: '20px' }}
              />

              <p className="mt-2">
                <b style={{ marginRight: '20px' }}>
                  <Link href="/profile">{user.name}</Link>
                </b>
              </p>
            </span>
          </div>
        )}

        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem className="login-inner login-inner-menu">
              <Link href="/">
                <i>
                  <img src="/icons/home.svg" alt="icon" />
                </i>
                Home
              </Link>
            </MenuItem>

            <MenuItem
              className="login-inner login-inner-menu"
              active={pathname.startsWith('/dashboard')}
            >
              <Link href={`/dashboard/${courseId}`}>
                <i>
                  <img src="/icons/progress.svg" alt="icon" />
                </i>
                Progress
              </Link>
            </MenuItem>

            {is_Tutorial === '1' && (
              <MenuItem
                className="login-inner login-inner-menu"
                active={pathname.startsWith('/tutorials')}
              >
                <Link href={`/tutorials/${courseId}`}>
                  <i>
                    <img src="/icons/play-icon.svg" alt="icon" />
                  </i>
                  Tutorials
                </Link>
              </MenuItem>
            )}

            {is_question_number === '1' && (
              <MenuItem
                className="login-inner login-inner-menu"
                active={pathname.startsWith('/questions')}
              >
                <Link href={`/questions/${courseId}`}>
                  <i>
                    <img src="/icons/question.svg" alt="icon" />
                  </i>
                  Questions
                </Link>
              </MenuItem>
            )}

            {is_Test === '1' && (
              <MenuItem
                className="login-inner login-inner-menu"
                active={pathname.startsWith('/mock-test')}
              >
                <Link href={`/mock-test/${courseId}`}>
                  <i>
                    <img src="/icons/mock-test.svg" alt="icon" />
                  </i>
                  Tests
                </Link>
              </MenuItem>
            )}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
}
