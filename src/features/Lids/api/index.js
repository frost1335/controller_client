export const getLidApi = async (id) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/lids/select/${id}`
  ).then((res) => res.json());

  return data;
};

export const createLidApi = async (body) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/lids`, {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const editLidApi = async (body, id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/lids/select/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deleteLidApi = async (id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/lids/select/${id}`, {
    method: "DELETE",
  });
};
