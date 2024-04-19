import axios from '@/lib/axios';

export async function purchasePlan(
  recordType,
  courseIds,
  packageIds,
  totalAmount
) {
  const response = await axios.post('/api/purchase/plan', {
    package_for: recordType,
    course_ids: courseIds.toString(),
    package_ids: packageIds.toString(),
    total_package_amount: totalAmount,
  });

  return response.data;
}

export async function callStripe(orderId, totalAmount) {
  const response = await axios.post('/api/stripe/call', {
    order_id: orderId,
    amount: totalAmount,
  });

  return response.data;
}