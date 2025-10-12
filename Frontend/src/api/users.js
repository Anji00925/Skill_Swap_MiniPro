import axios from "axios";

export const getUsers = async (token) => {
  const res = await axios.get("/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
