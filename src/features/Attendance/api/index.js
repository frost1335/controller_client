export const getAllAttendance = async () => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/attendance`,
  ).then((res) => res.json());

  return data;
};

export const getAttendance = async (id) => {
  const headers = new Headers();
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");
  headers.append("Content-type", "application/json");

  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}`,
    {
      headers,
    }
  ).then((res) => res.json());

  return data;
};

export const initAttendance = async (id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editStudentStatus = async (id, body) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addLessonApi = async (body, id) => {
  await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}/add`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteLessonApi = async (body, id) => {
  await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${id}/add`,
    {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const refreshAttendance = async (groupId) => {
  const headers = new Headers();
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");
  headers.append("Content-type", "application/json");

  await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/attendance/select/${groupId}/refresh`,
    {
      method: "PUT",
      headers: headers,
    }
  );
};
