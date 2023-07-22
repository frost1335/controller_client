import axios from "axios";

export const getAllStudentsApi = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/students`,
    {
      signal: controller.signal,
    }
  );

  return response.data;
};

export const getStudentApi = async (id, controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/students/select/${id}`,
    {
      signal: controller.signal,
    }
  );

  return response.data;
};

export const createStudentApi = async (body, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/students`,
    { ...body },
    {
      signal: controller.signal,
    }
  );

  return response.message;
};

export const editStudentApi = async (body, id, controller) => {
  const { data: response } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/students/select/${id}`,
    { ...body },
    { signal: controller.signal }
  );

  return response.message;
};

export const deleteStudentApi = async (id, controller) => {
  const { data: response } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/students/select/${id}`,
    { signal: controller.signal }
  );

  return response.message;
};

export const makePaymentApi = async (body, id, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/students/select/${id}`,
    { ...body },
    {
      signal: controller.signal,
    }
  );

  return response.message;
};

export const getSpecStudentsApi = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/students/specs`,
    {
      signal: controller.signal,
    }
  );
  return response.data;
};
