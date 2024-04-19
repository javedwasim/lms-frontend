'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import '@/styles/Sidebar.css';
import '@/styles/Questions.css';
import { useNavbar } from '@/context/navbar';
import { useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import { handleImageUrl } from '@/lib/utils';

export default function Sidebar() {
  const { user } = useAuth({ middleware: 'auth' });

  const name = user?.name;
  const userPicture = user?.profile_photo_url;

  const pathname = usePathname();

  const isMobile = useMediaQuery('(max-width: 1200px)');

  const [menuCollapse, setMenuCollapse] = useState(false);

  const { navbarCollapse } = useNavbar();

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <div
      id="header"
      className={navbarCollapse ? 'sidebar-login hello' : 'sidebar-login'}
    >
      <div
        className={menuCollapse ? 'closemenu' : 'closemenu rotateicon'}
        onClick={menuIconClick}
      >
        <img src="/icons/arrow-icon.svg" alt="icon" />
      </div>

      <ProSidebar
        collapsed={menuCollapse}
        className={`${isMobile ? 'collapsed-mobile' : 'non-mobile-class'}`}
      >
        <div className="text-center mt-4 desktop-none">
          <span>
            {userPicture ? (
              <img
                src={handleImageUrl(userPicture)}
                height="50px"
                width={'50px'}
                style={{ borderRadius: '50px', marginRight: '20px' }}
              />
            ) : (
              <img
                src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                height="50px"
                width={'50px'}
                style={{ borderRadius: '50px', marginRight: '20px' }}
              />
            )}

            <p className="mt-2">
              <b style={{ marginRight: '20px' }}>
                <Link href="/profile">{name}</Link>
              </b>
            </p>
          </span>
        </div>

        <SidebarHeader />

        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem
              className="login-inner login-inner-menu"
              active={pathname.startsWith('/profile')}
            >
              <Link href="/profile">
                <i>
                  <img src="icons/user.svg" alt="icon" />
                </i>
                Profile
              </Link>
            </MenuItem>
            <MenuItem
              className="login-inner login-inner-menu"
              active={pathname.startsWith('/transactions')}
            >
              <Link href="/transactions">
                <i>
                  <img src="/icons/transaction.svg" alt="icon" />
                </i>
                Transactions
              </Link>
            </MenuItem>
            <MenuItem
              className="login-inner login-inner-menu"
              active={pathname.startsWith('/contact')}
            >
              <Link href="/contact">
                <i>
                  <img src="/icons/call-icon.svg" alt="icon" />
                </i>
                Contact Us
              </Link>
            </MenuItem>

            <MenuItem
              className="login-inner login-inner-menu"
              active={pathname.startsWith('/change-password')}
            >
              <Link href="/change-password">
                <i>
                  <img src="/icons/change-password.svg" alt="icon" />
                </i>
                Change Password
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
}
