import axios from '@/lib/axios';

export async function fetchQuizQuestions(
  courseId,
  subcategoryIds,
  questionsCount,
  filter
) {
  const response = await axios.post('/api/questions/quiz', {
    course_id: courseId,
    subcategoryIds,
    questionsCount,
    filter,
  });

  return response?.data;
}

export async function fetchQuestion(questionId) {
  const response = await axios.get(`/api/questions/${questionId}`);

  return response?.data?.data;
}

export async function fetchSmartStudyQuestions(courseId) {
  const response = await axios.get(`/api/courses/${courseId}/smart-study`);

  console.log(response);

  return response?.data?.data;
}
