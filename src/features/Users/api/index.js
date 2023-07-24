import axios from "axios";

export const authLogin = async (body, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
    {
      ...body,
    },
    {
      signal: controller.signal,
    }
  );

  return response;
};

export const getUsers = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/auth/users`,
    {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );

  return response.data;
};

export const getAuthUser = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/auth/user`,
    {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );

  return response.data;
};

export const createUser = async (body, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/auth/user`,
    { ...body },
    {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );

  return response.message;
};

export const deleteUser = async (id, controller) => {
  const { data: response } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/auth/user/${id}`,
    {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );

  return response.message;
};
