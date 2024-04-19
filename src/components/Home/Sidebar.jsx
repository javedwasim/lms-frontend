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

export default function Sidebar() {
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
      className={!navbarCollapse ? 'login-inner hello' : 'login-inner'}
    >
      <div
        className={menuCollapse ? 'closemenu' : 'closemenu rotateicon'}
        onClick={() => setMenuCollapse((prev) => !prev)}
      >
        <img src="/icons/arrow-icon.svg" alt="icon" />
      </div>

      <ProSidebar
        collapsed={menuCollapse}
        className={isMobile ? 'collapsed-mobile' : 'non-mobile-class'}
      >
        {user && (
          <div className="text-center mt-4  mb-3 desktop-none">
            <span>
              <img
                src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                height="50px"
                width={'50px'}
                style={{ borderRadius: '50px', marginRight: '20px' }}
              />

              <p className="mt-2">
                <b style={{ marginRight: '20px' }}>
                  <Link href="/profile">{user.name}</Link>
                </b>
              </p>
            </span>
            <Link className="login-button-sidebar" href="/profile">
              Account
            </Link>
          </div>
        )}

        <SidebarHeader />

        <SidebarContent className="without-login-nav">
          <Menu iconShape="square">
            <MenuItem active={pathname == '/' ? true : false}>
              <Link href="/">
                <i>
                  <img
                    className="hover-none"
                    src="/icons/courses.svg"
                    alt="icon"
                  />
                </i>
                Courses
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="https://www.medicmind.co.uk/ucat-tutoring/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i>
                  <img
                    className="hover-none"
                    src="/icons/tutoring.svg"
                    alt="icon"
                  />
                </i>
                Tutoring
              </Link>
            </MenuItem>

            <MenuItem active={pathname == '/seminars' ? true : false}>
              <Link href="/seminars">
                <i>
                  <img
                    className="hover-none"
                    src="/icons/seminars.svg"
                    alt="icon"
                  />
                </i>
                Seminars
              </Link>
            </MenuItem>

            <MenuItem active={pathname == '/books' ? true : false}>
              <Link href="/books">
                <i>
                  <img
                    className="hover-none"
                    src="/icons/books.svg"
                    alt="icon"
                  />
                </i>
                Books
              </Link>
            </MenuItem>

            <MenuItem active={pathname == '/flashcards' ? true : false}>
              <Link href="/flashcards">
                <i>
                  <img
                    className="hover-none"
                    src="/icons/flashcards.svg"
                    alt="icon"
                  />
                </i>
                Flashcards
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
}
