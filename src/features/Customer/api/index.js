import axios from "axios";

export const getAllCustomersApi = async () => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/customers`
  );

  return response.data;
};

export const getCustomerApi = async (id, controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/customers/select/${id}`,
    {
      signal: controller.signal,
    }
  );

  return response.data;
};

export const createCustomerApi = async (body, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/customers`,
    { ...body },
    {
      signal: controller.signal,
    }
  );

  return response.message;
};

export const editCustomerApi = async (body, id, controller) => {
  const { data: response } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/customers/select/${id}`,
    { ...body },
    { signal: controller.signal }
  );

  return response.message;
};

export const deleteCustomerApi = async (id) => {
  const { data: response } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/customers/select/${id}`
  );

  return response.message;
};
