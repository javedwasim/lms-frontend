import axios from '@/lib/axios';
import Swal from 'sweetalert2';

export async function updateUserProfile(userId, userName, image) {
  const formData = new FormData();

  formData.append('name', userName);
  formData.append('image', image);

  const response = await axios.post(`/api/profiles/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response?.data?.data;
}

export async function changeUserPassword(oldPassword, newPassword) {
  try {
    const response = await axios.put(`/api/profiles/update-password`, {
      oldPassword,
      password: newPassword,
    });

    return response;
  } catch (error) {
    if (error.response.status === 422) {
      Swal.fire({
        title: 'Invalid credentials',
        timer: 2000,
        icon: 'error',
      });
    }
  }
}
