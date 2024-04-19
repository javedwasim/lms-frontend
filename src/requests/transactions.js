import axios from '@/lib/axios';

export async function fetchTransactions(type, fromDate, toDate) {
  const response = await axios.post(`/api/transactions`, {
    type,
    fromDate,
    toDate,
  });

  return response?.data?.data;
}
