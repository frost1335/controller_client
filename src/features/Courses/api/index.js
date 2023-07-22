import axios from "axios";

export const getAllCoursesApi = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/courses`,
    { signal: controller.signal }
  );

  return response.data;
};

export const getCourseApi = async (id, controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/courses/select/${id}`,
    { signal: controller.signal }
  );

  return response.data;
};

export const createCourseApi = async (body, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/courses`,
    body,
    { signal: controller.signal }
  );

  return response.message;
};

export const editCourseApi = async (body, id, controller) => {
  const { data: response } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/courses/select/${id}`,
    body,
    {
      signal: controller.signal,
    }
  );

  return response.message;
};

export const deleteCourseApi = async (id, controller) => {
  const { data: response } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/courses/select/${id}`,
    {
      signal: controller.signal,
    }
  );

  return response.message;
};
