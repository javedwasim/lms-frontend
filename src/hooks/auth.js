import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import axios from '@/lib/axios';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        router.push('/verify-email');
      })
  );

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post('/register', props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post('/login', props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setErrors([]);

    axios
      .post('/forgot-password', { email })
      .then((response) => {
        setStatus(response.data.message);
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ token, setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post('/reset-password', { token, ...props })
      .then((response) => {
        router.push('/login?reset=' + btoa(response.data.message));
      })
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios.post('/email/verification-notification').then((response) => {
      setStatus(response.statusText);
    });
  };

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate());
    }

    window.location.pathname = '/login';
  };

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);

    if (
      window.location.pathname === '/verify-email' &&
      redirectIfAuthenticated &&
      user?.email_verified_at
    )
      router.push(redirectIfAuthenticated);

    if (middleware === 'auth' && error) logout();
  }, [user, error]);

  return {
    user,
    mutate,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
