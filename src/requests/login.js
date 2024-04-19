import axios from '@/lib/axios';

export const socialLogin = async (
  type,
  id,
  email,
  profile_photo_path,
  name
) => {
  try {
    const response = await axios.post('/api/social-media-login', {
      social_media_type: type,
      social_media_id: id,
      email,
      profile_photo_path,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};
