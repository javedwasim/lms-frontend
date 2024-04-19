'use client';

import { useState } from 'react';

import { useAuth } from '@/hooks/auth';

export default function Login() {
  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    forgotPassword({ email, setErrors, setStatus });
  };

  return (
    <div className="login-height">
      <h4>Reset Your Password</h4>

      {status && <div className="login-status">{status}</div>}

      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input-single"
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
          <button type="submit">Send Reset Link</button>
        </div>
      </form>
    </div>
  );
}
