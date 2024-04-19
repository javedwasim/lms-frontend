import axios from '@/lib/axios';

export default async function fetcher(url) {
  return axios.get(url).then((res) => res.data);
}
