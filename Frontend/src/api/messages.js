import axios from "axios";

export const sendMessage = async (recipientId, text, token) => {
  const res = await axios.post(
    "http://localhost:5000/api/messages",
    { recipientId, text },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const getChatHistory = async (userId, token) => {
  const res = await axios.get(
    `http://localhost:5000/api/messages/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
