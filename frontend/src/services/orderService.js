import api from "./api";

export const placeOrder = async (vehicleId) => {
  return api.post('/orders', { vehicleId });
};

export const getOrders = async () => {
  return api.get('/orders');
};

export const approveOrder = async (id) => {
  return api.put(`/orders/${id}/approve`, {});
};

export const rejectOrder = async (id) => {
  return api.put(`/orders/${id}/reject`, {});
};