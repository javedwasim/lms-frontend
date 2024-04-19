import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

export const useCategoryTutorial = (courseId, categoryId) => {
  const {
    data: response,
    error,
    isLoading,
    mutate
  } = useSWR(`/api/courses/${courseId}/tutorials/category/${categoryId}`, fetcher);

  return {
    data: response?.data,
    error,
    isLoading,
    mutate
  };
};

export const useTutorials = (courseId) => {
    const {
        data: response,
        error,
        isLoading,
    } = useSWR(`/api/courses/${courseId}/tutorials`, fetcher);
    
    return {
        data: response?.data,
        error,
        isLoading,
    };
}

export const useTutorialComments = (tutorialId) => {
    const {
        data: response,
        error,
        isLoading,
    } = useSWR(`/api/tutorials/${tutorialId}/comments`, fetcher);

    return {
        data: response?.data,
        error,
        isLoading,
    };
}