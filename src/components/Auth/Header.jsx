import Link from 'next/link';

import { useAuth } from '@/hooks/auth';
import { useNavbar } from '@/context/navbar';

import { Navbar } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';

import '@/styles/Header.css';
import { handleImageUrl } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export default function Header() {
  const { user, logout } = useAuth({ middleware: 'guest' });

  const pathname = usePathname();

  const { setNavbarCollapse } = useNavbar();

  const toggleNavbar = (e) => {
    setNavbarCollapse((prev) => !prev);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#512e7f',
      cancelButtonColor: '#251446',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <Navbar className="px-4">
      <Navbar.Brand>
        <Link href="/" className="logo">
          <img
            style={{ width: '147px', height: '45px' }}
            src="/images/header-logo.png"
          />
        </Link>
      </Navbar.Brand>

      {(pathname.startsWith('/dashboard') ||
        pathname.startsWith('/tutorials') ||
        pathname.startsWith('/questions') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/transaction') ||
        pathname.startsWith('/contact')) && (
        <div className="back-link px-2 mt-4">
          <Link href="/">
            <p>
              <span className="rotateicons">
                <img src="/icons/right-arrow.svg" alt="back" />
              </span>
              Back to my courses
            </p>
          </Link>
        </div>
      )}

      {!pathname.startsWith('/login') && (
        <GiHamburgerMenu className="togle-menu-btn" onClick={toggleNavbar} />
      )}

      {/* <Navbar.Toggle /> */}

      <Navbar.Collapse className="justify-content-end login-button-container">
        {user ? (
          <>
            <p className="profile-name">
              <b style={{ marginRight: '5px' }}>{user?.name}</b>
            </p>

            <span className="profile-icon" style={{ cursor: 'pointer' }}>
              {user?.profile_photo_path ? (
                <img
                  src={handleImageUrl(user?.profile_photo_path)}
                  height="40px"
                  width={'40px'}
                  style={{ borderRadius: '50px', marginRight: '20px' }}
                />
              ) : (
                <img
                  src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                  height="40px"
                  width={'40px'}
                  style={{ borderRadius: '50px', marginRight: '20px' }}
                />
              )}
            </span>

            <Navbar.Text className="desktop-nones">
              <Link className="login-button-link mx-1" href="/profile">
                Account
              </Link>
            </Navbar.Text>

            <Navbar.Text>
              <button onClick={handleLogout} className="login-button">
                <FiLogOut /> Log-Out
              </button>
            </Navbar.Text>
          </>
        ) : (
          <Navbar.Text>
            <Link href="/login" className="login-button">
              <img src="/icons/profile.svg" /> Log-In
            </Link>
          </Navbar.Text>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
