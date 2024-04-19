import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useQuizQuestion = (questionId) => {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/questions/${questionId}`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
    mutate,
  };
};
