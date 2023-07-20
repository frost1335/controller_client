export const getAllGroupsApi = async () => {
  const data = await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups`).then(
    (res) => res.json()
  );

  return data;
};

export const getGroupApi = async (id) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`
  ).then((res) => res.json());

  return data;
};

export const createGroupApi = async (body) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups`, {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editGroupApi = async (body, id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteGroupApi = async (id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`, {
    method: "DELETE",
  });
};

export const detachTeacherField = async (body, id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups/${id}/detach`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return "success";
};

export const getMinGroups = async (groupId) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/groups/min?groupId=${groupId}`
  ).then((res) => res.json());

  return data;
};

export const addStudents = async (body, id) => {
  await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/add/students`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return "success";
};

export const removeStudent = async (body, id) => {
  await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/remove/student`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const replaceStudent = async (body, id) => {
  await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/groups/${id}/replace/student`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

