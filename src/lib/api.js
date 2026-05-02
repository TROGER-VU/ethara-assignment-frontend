// export const API_URL = "https://ethara-assignment-backend-production-b5c4.up.railway.app";
export const API_URL = "http://localhost:5000";

export const getToken = () => localStorage.getItem("token");

export const fetchAPI = async (endpoint, options = {}) => {
  const token = getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return res.json();
};