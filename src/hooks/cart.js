import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useCart = (type) => {
  const {
    data: response,
    error,
    isLoading,
    mutate
  } = useSWR(`/api/carts?package_for=${type}`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
    mutate
  };
};
