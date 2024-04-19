import axios from '@/lib/axios';

export async function fetchCourseProgress(courseId, startDate, endDate) {
  const response = await axios.post(`/api/courses/${courseId}/progress`, {
    start_date: startDate,
    end_date: endDate,
  });

  return response?.data?.data;
}

export async function addExamDate(courseId, examDate) {
  const response = await axios.post(`/api/courses/${courseId}/examdate`, {
    exam_date: examDate,
  });

  return response?.data?.data;
}
