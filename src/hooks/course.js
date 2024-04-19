import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { useAuth } from '@/hooks/auth';

export const useCourses = () => {
  const { user } = useAuth();

  let url = '/api/courses';

  if (user) {
    url = '/api/my-courses';
  }

  const { data: response, error, isLoading } = useSWR(url, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
  };
};

export const useCourseDetails = (id) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/courses/${id}`, fetcher);

  return {
    data: response?.data?.[0],
    error,
    isLoading,
  };
};

export const useCourseInstructions = (id) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/courses/${id}/instructions`, fetcher);

  return {
    data: response?.data?.instruction,
    error,
    isLoading,
  };
};
