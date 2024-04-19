import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useMockTest = (mockTestId, categoryId) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/mocktests/${mockTestId}?categoryId=${categoryId}`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};

export const useMockTests = (courseId) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/mocktests?course_id=${courseId}`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};

export const useMockTestCategories = (courseId, mockTestId) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/mocktests/${courseId}/category/${mockTestId}`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};

export const useMockTestScore = (courseId, mockTestId) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(
    `/api/mocktests/${mockTestId}/score?course_id=${courseId}`,
    fetcher
  );

  return {
    data: response?.data,
    error,
    isLoading,
  };
};

export const useMockTestQuestion = (mockTestId) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/mocktests/${mockTestId}/questions`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};
