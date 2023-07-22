export const getAllTeachersApi = async () => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/teachers`
  ).then((res) => res.json());

  return data;
};

export const getTeacherApi = async (id) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/teachers/select/${id}`
  ).then((res) => res.json());

  return data;
};

export const createTeacherApi = async (body) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/teachers`, {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editTeacherApi = async (body, id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/teachers/select/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deleteTeacherApi = async (id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/teachers/select/${id}`, {
    method: "DELETE",
  });

  return 'msg'
};
