import axios from "axios";

export const searchStudents = async (search) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/students/search?search=${search}`
  );

  return response.data;
};

export const getPaymentHistory = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/students/payment/history`,
    { signal: controller.signal }
  );

  return response.data;
};
