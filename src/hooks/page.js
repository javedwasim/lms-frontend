import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

export const usePageDetails = (type) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/page/${type}`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};
