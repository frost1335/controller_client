export const getAllStudentsApi = async () => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/students`
  ).then((res) => res.json());

  return data;
};

export const getStudentApi = async (id) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/students/select/${id}`
  ).then((res) => res.json());

  return data;
};

export const createStudentApi = async (body) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/students`, {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editStudentApi = async (body, id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/students/select/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });
};

export const deleteStudentApi = async (id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/students/select/${id}`, {
    method: "DELETE",
  });
};

export const makePaymentApi = async (body, id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/students/select/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body }),
  });
};

export const getSpecStudentsApi = async (id) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/students/specs?groupId=${id}`
  ).then((res) => res.json());

  return data;
};
