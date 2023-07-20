export const searchStudents = async (search) => {
  const data = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/students/search?search=${search}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return data;
};
