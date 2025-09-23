import axios from "axios";

const API_URL = "http://localhost:5000/api/connections";

export const sendConnectionRequest = async (recipientId, token, skill) => {
  const res = await axios.post(
    "http://localhost:5000/api/connections/request",
    { to: recipientId, skill },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};



// Accept a request
export const acceptRequest = async (connectionId, token) => {
  const res = await axios.put(
    `${API_URL}/accept/${connectionId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Reject a request
export const rejectRequest = async (connectionId, token) => {
  const res = await axios.put(
    `${API_URL}/reject/${connectionId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Get accepted connections
export const getConnections = async (userId, token) => {
  const res = await axios.get(`${API_URL}/accepted/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get pending requests (received by me)
export const getPendingForMe = async (userId, token) => {
  const res = await axios.get(`${API_URL}/pending/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get pending requests I sent
export const getSentRequests = async (userId, token) => {
  const res = await axios.get(`${API_URL}/sent/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
