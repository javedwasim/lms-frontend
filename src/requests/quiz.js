import axios from '@/lib/axios';

export async function fetchQuizCountdownTime(courseId) {
  const response = await axios.post('/api/quiz/additional-time-category', {
    course_id: courseId,
  });

  return response?.data?.data;
}

export async function submitAnswer(questionId, answer, dragAndDropAnswer) {
  const response = await axios.post('/api/tests/make', {
    question_id: questionId,
    answer,
    correct_option_json: dragAndDropAnswer
      ? dragAndDropAnswer.replace(/\\"/g, '')
      : '',
  });

  return response?.data?.data;
}

export async function addQuestionForReview(questionId) {
  const response = await axios.post('/api/questions/review', {
    question_id: questionId,
  });

  return response?.data?.data;
}

export async function reviewTestBeforeFinish() {
  const response = await axios.post('/api/tests/review-before-finish');

  return response?.data?.data;
}

export async function finishTest(courseId) {
  const response = await axios.post('/api/tests/finish', {
    course_id: courseId,
  });

  return { response: response?.data?.data, code: response?.data?.code };
}

export async function reviewTestAfterFinish() {
  const response = await axios.post('/api/tests/review-after-finish');

  return response?.data?.data;
}
export async function fetchScoreAfterFinish(courseId) {
  const response = await axios.post('/api/tests/score-after-finish', {
    course_id: courseId,
  });

  return response?.data?.data;
}

export async function deleteQuiz() {
  const response = await axios.delete('/api/quiz');

  return response?.data?.data;
}

export async function submitQuestionIssue(
  questionId,
  description,
  email,
  options
) {
  const response = await axios.post('/api/reports', {
    question_id: questionId,
    options,
    description,
    email,
  });

  return response?.data?.data;
}
