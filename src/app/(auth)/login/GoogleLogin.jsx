import { useEffect } from 'react';
import { gapi } from 'gapi-script';

import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';

import { socialLogin } from '@/requests/login';
import { useAuth } from '@/hooks/auth';

export default function GoogleLoginComponent() {
  const { mutate } = useAuth();

  const responseGoogle = (response) => {
    socialLogin(
      'google',
      response?.profileObj.googleId,
      response?.profileObj.email,
      response?.profileObj.imageUrl,
      response?.profileObj.name
    ).then(() => {
      mutate();
    });
  };

  const loadGapi = () => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          '1095617252260-4hq2comuuij9f9d1edvc8l6sujrvjfsr.apps.googleusercontent.com',
        scope: 'profile',
      });
    };

    gapi.load('client:auth2', initClient);
  };

  useEffect(() => {
    loadGapi();
  }, []);

  return (
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
            Sign In With Google
          </p>
        </button>
      )}
    />
  );
}
