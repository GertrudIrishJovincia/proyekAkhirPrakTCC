import axios from "axios";

const instance = axios.create({
  baseURL: "https://proyekakhirpraktcc-174534490336.us-central1.run.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
