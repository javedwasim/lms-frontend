import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useQuizQuestions = () => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR('/api/applyfilter', fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};

export const useCourseQuestions = (courseId, filter) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(
    `/api/courses/${courseId}/questions?filter_type=${filter}`,
    fetcher
  );

  return {
    data: response?.data,
    error,
    isLoading,
  };
};

export const useQuestionFeedback = (questionId) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/questions/${questionId}/feedback`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};

export const useMockQuestionFeedback = (questionId) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/mocktests/questions/${questionId}/feedback`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};
