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
  }).then((res) => res.json());
};

export const deleteGroupApi = async (id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/groups/select/${id}`, {
    method: "DELETE",
  });
};

export const getCoursesArr = async (query) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/courses?${query}`
  ).then((res) => res.json());

  return data;
};

export const getTeachersArr = async (query) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/teachers?${query}`
  ).then((res) => res.json());

  return data;
};
