import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useProfile = () => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR('/api/profiles/user', fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};
