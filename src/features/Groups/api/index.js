import axios from "axios";

export const getAllGroupsApi = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/groups`,
  );

  return response.data;
};

export const getGroupApi = async (id, controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`,
  );

  return response.data;
};

export const createGroupApi = async (body, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/groups`,
    { ...body },
  );

  return response.message;
};

export const editGroupApi = async (body, id, controller) => {
  const { data: response } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`,
    { ...body },
  );

  return response.message;
};

export const deleteGroupApi = async (id, controller) => {
  const { data: response } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`,
  );

  return response.message;
};

export const detachField = async (body, id, controller) => {
  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/detach`,
    body,
  );

  return response.message;
};

export const getMinGroups = async (groupId, controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/groups/min?groupId=${groupId}`,
  );

  return response.data;
};

export const addStudents = async (body, id, controller) => {
  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/add/students`,
    body,
  );

  return response.message;
};

export const removeStudent = async (body, id, controller) => {
  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/remove/student`,
    body,
  );

  return response.message;
};

export const replaceStudent = async (body, id, controller) => {
  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/replace/student`,
    body,
  );

  return response.message;
};
