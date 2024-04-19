export const truncate = (input, length) => {
  if (!input) return null;
  return input.length > length ? `${input.substring(0, length)}...` : input;
};

const ImageBaseUrl =
  'https://media-studymind-co-uk.ams3.cdn.digitaloceanspaces.com';

export const handleImageUrl = (url) => {
  return url?.startsWith('https') ? url : ImageBaseUrl + '/' + url;
};
