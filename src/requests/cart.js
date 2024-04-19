import axios from '@/lib/axios';

export async function addCartItem(recordType, courseId, packageId) {
  const response = await axios.post('/api/carts', {
    record_type: recordType,
    course_id: courseId,
    package_id: packageId,
  });

  return response;
}

export async function deleteCartItem(id) {
  const response = await axios.delete(`/api/carts/${id}`);

  return response;
}
