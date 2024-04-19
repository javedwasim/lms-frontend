import axios from '@/lib/axios';

export const addTutorialBookmark = async (courseId, videoData, tutorialId) => {
  const { data } = await axios.post(`/api/tutorials/${tutorialId}/bookmarks`, {
    courseId,
    videoData,
  });
  return data;
};

export const addTutorialComment = async (tutorialId, comment) => {
  const { data } = await axios.post(`/api/tutorials/${tutorialId}/comments`, {
    comment,
  });
  return data;
};

export const addTutorialCommentLike = async (id, type) => {
  const { data } = await axios.post(`/api/tutorials/comments/like`, {
    id,
    type,
  });
  return data;
};

export const addTutorialNote = async (tutorialId, note) => {
  const { data } = await axios.post(`/api/tutorials/${tutorialId}/notes`, {
    note,
  });
  return data;
};

export const editTutorialNote = async (tutorialId, noteId, note) => {
  const { data } = await axios.put(
    `/api/tutorials/${tutorialId}/notes/${noteId}/edit`,
    {
      note,
    }
  );
  return data;
};

export const deleteTutorialNote = async (noteId) => {
  const { data } = await axios.delete(`/api/tutorials/notes/${noteId}`);
  return data;
};

export const addTutorialWatchlist = async (
  tutorialId,
  courseId,
  watchedTime
) => {
  const { data } = await axios.post(`/api/tutorials/${tutorialId}/watchlist`, {
    course_id: courseId,
    watched_time: watchedTime,
  });
  return data;
};
