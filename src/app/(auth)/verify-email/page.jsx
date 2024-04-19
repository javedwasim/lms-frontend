'use client';

import { useAuth } from '@/hooks/auth';
import { useState } from 'react';

const VerifyEmail = () => {
  const { user, logout, resendEmailVerification } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/',
  });

  const [status, setStatus] = useState(null);

  return (
    <>
      <div
        style={{
          color: 'white',
          fontSize: '18px',
          marginTop: '16px',
        }}
      >
        <b>Thanks for signing up!</b>
        <br />
        <br />
        Before getting started, could you verify your email address by clicking
        on the link we just emailed to you?
        <br />
        <br />
        If you didn't receive the email, we will gladly send you another.
        {status === 'Accepted' && (
          <div
            style={{
              marginTop: '16px',
              fontWeight: '500',
            }}
          >
            A new verification link has been sent to the email address you
            provided during registration.
          </div>
        )}
      </div>

      <div className="sign-btn text-center">
        <button
          type="button"
          onClick={() => resendEmailVerification({ setStatus })}
        >
          Resend Verification Email
        </button>
      </div>

      <div className="sign-btn text-center">
        <button
          type="button"
          className="text-sm text-gray-600 underline hover:text-gray-900"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default VerifyEmail;
