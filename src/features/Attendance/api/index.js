import axios from "axios";

export const getAllAttendance = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/attendance`,
    { signal: controller.signal }
  );

  return response.data;
};

export const getAttendance = async (id, controller) => {
  const headers = new Headers();
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");

  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}`,
    {
      headers,
      signal: controller.signal,
    }
  );

  return response.data;
};

export const initAttendance = async (id, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}`,
    { signal: controller.signal }
  );

  return response.message;
};

export const editStudentStatus = async (id, body, controller) => {
  const { data: response } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}`,
    body,
    { signal: controller.signal }
  );

  return response.message;
};

export const addLessonApi = async (body, id, controller) => {
  const { data: response } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}/add`,
    body,
    { signal: controller.signal }
  );

  return response.message;
};

export const deleteLessonApi = async (body, id, controller) => {
  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}/add`,
    body,
    { signal: controller.signal }
  );

  return response.message;
};

export const refreshAttendance = async (groupId, controller) => {
  const headers = new Headers();
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");

  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${groupId}/refresh`,
    {},
    {
      signal: controller.signal,
      headers,
    }
  );

  return response.message;
};
