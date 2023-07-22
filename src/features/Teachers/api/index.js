import axios from "axios";

export const getAllTeachersApi = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/teachers`,
    {
      signal: controller.signal,
    }
  );

  return response.data;
};

export const getTeacherApi = async (id, controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/teachers/select/${id}`,
    {
      signal: controller.signal,
    }
  );

  return response.data;
};

export const createTeacherApi = async (body, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/teachers`,
    { ...body },
    {
      signal: controller.signal,
    }
  );

  return response.message;
};

export const editTeacherApi = async (body, id, controller) => {
  const { data: response } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/teachers/select/${id}`,
    { ...body },
    {
      signal: controller.signal,
    }
  );

  return response.message;
};

export const deleteTeacherApi = async (id, controller) => {
  const { data: response } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/teachers/select/${id}`,
    { signal: controller.signal }
  );

  return response.message;
};
