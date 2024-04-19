'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { useAuth } from '@/hooks/auth';

import dynamic from 'next/dynamic';
const GoogleLogin = dynamic(() => import('./GoogleLogin'), { ssr: false });

export default function Login() {
  const searchParams = useSearchParams();

  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      email,
      password,
      setErrors,
    });
  };

  // when redirected after password reset
  useEffect(() => {
    if (searchParams.get('reset') && errors.length === 0) {
      setStatus(atob(searchParams.get('reset')));
    } else {
      setStatus(null);
    }
  }, []);

  return (
    <div>
      <h4>Welcome back!</h4>

      {status && <div className="login-status">{status}</div>}

      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            password={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <button type="submit">Log in</button>
          <Link className="forgot-pass" href="/forgot-password">
            Forgot Password?
          </Link>
        </div>
      </form>

      <p>Alternatively you can</p>

      <div className="other-login">
        {/* <FacebookLogin
          appId="945486143162199"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          render={(renderProps) => (
            <button className="google" onClick={renderProps.onClick}>
              <p className="google-icon" style={{ color: 'blue' }}>
                <i>
                  <FaFacebookSquare />
                </i>
                <span className="face-text">Sign In With Facebook</span>{' '}
              </p>
            </button>
          )}
        /> */}

        {/* <GoogleLogin
          clientId="1095617252260-4hq2comuuij9f9d1edvc8l6sujrvjfsr.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={responseGoogle}
          cookiePolicy={'single_host_origin'}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="google"
              disabled={renderProps.disabled}
            >
              <p className="google-icon" style={{ color: 'black' }}>
                <i>
                  <FcGoogle />
                </i>
                Sign In With Google
              </p>
            </button>
          )}
        /> */}
        <GoogleLogin />
      </div>

      <p>Don't have an account?</p>

      <div className="login-btn text-center">
        <Link href="/register">Sign up here</Link>
      </div>
    </div>
  );
}
