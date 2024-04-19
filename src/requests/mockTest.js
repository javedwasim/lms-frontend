import axios from '@/lib/axios';

export async function startMockTest(
  mockTestId,
  categoryId,
  questionArray,
  questionId,
  resume
) {
  const response = await axios.post(`/api/mocktests/${mockTestId}/start`, {
    question_id: questionId,
    all_question_id: questionArray,
    categoryIds: categoryId,
    mocktestId: mockTestId,
    resume,
  });

  return response;
}

export async function fetchMockQuestion(
  mockTestId,
  categoryId,
  questionArray,
  questionId
) {
  const response = await axios.post(`/api/mocktests/${mockTestId}/questions`, {
    mock_test_id: mockTestId,
    category_id: categoryId,
    current_question_id: questionId,
    filter_questions_id: questionArray,
    questionstype: '',
  });

  return response;
}

export async function submitMockAnswer(
  mockTestId,
  questionId,
  answer,
  correct_option_json
) {
  const response = await axios.post(`/api/mocktests`, {
    mocktestId: mockTestId,
    categoryId: 39,
    question_id: questionId,
    answer,
    correct_option_json,
    question_type: 1,
  });

  return response;
}

export async function reviewMockTestBeforeFinish(mockTestId, categoryId) {
  const response = await axios.post(
    `/api/mocktest/${mockTestId}/review-before-finish`,
    {
      mocktestId: mockTestId,
      categoryId: categoryId,
    }
  );

  return response?.data?.data;
}

export async function finishMockTest(mockTestId, categoryId, resume) {
  const response = await axios.post(`/api/mocktests/${mockTestId}/finish`, {
    mocktest_id: mockTestId,
    category_id: categoryId,
    resume,
  });

  return response;
}

export async function fetchMockReviewAfterFinish(mockTestId) {
  const response = await axios.post(
    `/api/mocktest/${mockTestId}/review-after-finish-by-category`,
    {
      mocktest_id: mockTestId,
    }
  );

  return response;
}
