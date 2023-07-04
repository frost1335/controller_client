export const getAllCoursesApi = async () => {
  const data = await fetch(`${import.meta.env.VITE_BASE_URL}/api/courses`).then(
    (res) => res.json()
  );

  return data;
};

export const getCourseApi = async (id) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/courses/select/${id}`
  ).then((res) => res.json());

  return data;
};

export const createCourseApi = async (body) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/courses`, {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editCourseApi = async (body, id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/courses/select/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deleteCourseApi = async (id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/courses/select/${id}`, {
    method: "DELETE",
  });
};
