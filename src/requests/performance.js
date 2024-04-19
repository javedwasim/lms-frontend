import axios from '@/lib/axios';

export async function createUserPerformanceReport(courseId) {
  const response = await axios.post(`/api/performance`, {
    courseId,
  });

  return response?.data?.data;
}
