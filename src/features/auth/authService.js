import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosconfig'

// Login
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data))
  }
  return response.data
}

// Get Orders
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config)
  return response.data
}

// Get Order
const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getaOrder/${id}`,
    config
  );
  return response.data;
};

// Update Order
const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/updateOrder/${data.id}`, { status: data.status },
    config
  );
  return response.data;
};

// get Monthly Orders
const getMonthlyOrders = async (data) => {
  const response = await axios.get(
    `${base_url}user/getMonthWiseOrderIncome`,
    data
  );
  return response.data;
};

// Get Yearly Orders
const getYearlyStats = async (data) => {
  const response = await axios.get(
    `${base_url}user/getyearlyorders`,
    data
  );
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyStats,
  updateOrder
}
export default authService

