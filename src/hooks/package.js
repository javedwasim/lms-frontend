import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const usePackages = (courseId, packageFor) => {
  const {
    data: response,
    error,
    isLoading,
  } = useSWR(
    `/api/packages?course_id=${courseId}&package_for=${packageFor}`,
    fetcher
  );

  return {
    data: response?.data,
    error,
    isLoading,
  };
};
