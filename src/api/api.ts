import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-p4-klvc.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers["x-nombre"] = "CELIA";

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

export default api;