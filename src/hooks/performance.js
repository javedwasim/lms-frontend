import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const usePerformanceReport = (id) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/performance/${id}`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};
