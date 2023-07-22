import axios from "axios";

export const searchStudents = async (search) => {
  const { data: response } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/students/search?search=${search}`
  );

  return response.data;
};
