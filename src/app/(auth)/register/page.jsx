'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useAuth } from '@/hooks/auth';

export default function Login() {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: confirmPassword,
      setErrors,
    });
  };

  return (
    <div>
      <h4>Hi there! Let’s begin your learning</h4>

      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <input
            type="text"
            placeholder="Full Name"
            required
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
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
          <button type="submit">Sign Up</button>
        </div>
      </form>

      <p>Alternatively you can</p>

      {/* <div className="other-login">
  <FacebookLogin
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
          <span className="face-text">
            Sign In With Facebook
          </span>{' '}
        </p>
      </button>
    )}
  />

  <GoogleLogin
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
          Sign In With Google{' '}
        </p>
      </button>
    )}
  />
</div> */}

      <p>Already have an account?</p>

      <div className="login-btn text-center">
        <Link href="/login">Log in here</Link>
      </div>
    </div>
  );
}
