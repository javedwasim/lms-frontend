'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useAuth } from '@/hooks/auth';

export default function PasswordReset({ params }) {
  const searchParams = useSearchParams();

  const { resetPassword } = useAuth({ middleware: 'guest' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();

    resetPassword({
      email,
      password,
      password_confirmation: confirmPassword,
      setErrors,
      token: params.token,
    });
  };

  useEffect(() => {
    setEmail(searchParams.get('email') || '');
  }, [searchParams]);

  return (
    <div className="login-height">
      <h4>Enter your new password</h4>

      <form onSubmit={submitForm}>
        <div className="login-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            readOnly
          />
          <input
            type="password"
            placeholder="New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="last-input"
            type="password"
            placeholder="Confirm Password"
            required
            name="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {Object.keys(errors).map((field) => {
          return errors[field].map((error) => {
            return (
              <div className="login-error" key={error}>
                {error}
              </div>
            );
          });
        })}

        <div className="sign-btn text-center">
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
}
