import axios from "axios";

const erpApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor para enviar token
erpApi.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default erpApi;
