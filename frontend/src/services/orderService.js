import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const placeOrder = async (vehicleId) => {
    const token = localStorage.getItem("token");

    return axios.post(
        API,
        {
            vehicleId: vehicleId
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const getOrders = async () => {
    const token = localStorage.getItem("token");

    return axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const approveOrder = async (id) => {
    const token = localStorage.getItem("token");

    return axios.put(
        `${API}/${id}/approve`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const rejectOrder = async (id) => {
    const token = localStorage.getItem("token");

    return axios.put(
        `${API}/${id}/reject`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};