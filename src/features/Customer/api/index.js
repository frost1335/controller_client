export const getAllCustomersApi = async () => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/customers`
  ).then((res) => res.json());

  return data;
};

export const getCustomerApi = async (id) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/customers/select/${id}`
  ).then((res) => res.json());

  return data;
};

export const createCustomerApi = async (body) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/customers`, {
    method: "POST",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const editCustomerApi = async (body, id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/customers/select/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ ...body }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const deleteCustomerApi = async (id) => {
  await fetch(`${import.meta.env.VITE_BASE_URL}/api/customers/select/${id}`, {
    method: "DELETE",
  });
};
