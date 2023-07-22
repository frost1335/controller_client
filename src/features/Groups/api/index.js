import axios from "axios";

export const getAllGroupsApi = async (controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/groups`,
    { signal: controller.signal }
  );

  return response.data;
};

export const getGroupApi = async (id, controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`,
    {
      signal: controller.signal,
    }
  );

  return response.data;
};

export const createGroupApi = async (body, controller) => {
  const { data: response } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/groups`,
    { ...body },
    { signal: controller.signal }
  );

  return response.message;
};

export const editGroupApi = async (body, id, controller) => {
  const { data: response } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`,
    { ...body },
    { signal: controller.signal }
  );

  return response.message;
};

export const deleteGroupApi = async (id, controller) => {
  const { data: response } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`,
    { signal: controller.signal }
  );

  return response.message;
};

export const detachTeacherField = async (body, id, controller) => {
  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/detach`,
    body,
    { signal: controller.signal }
  );

  return response.message;
};

export const getMinGroups = async (groupId, controller) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/groups/min?groupId=${groupId}`,
    { signal: controller.signal }
  );

  return response.data;
};

export const addStudents = async (body, id, controller) => {
  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/add/students`,
    body,
    { signal: controller.signal }
  );

  return response.message;
};

export const removeStudent = async (body, id, controller) => {
  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/remove/student`,
    body,
    { signal: controller.signal }
  );

  return response.message;
};

export const replaceStudent = async (body, id, controller) => {
  const { data: response } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/replace/student`,
    body,
    { signal: controller.signal }
  );

  return response.message;
};
