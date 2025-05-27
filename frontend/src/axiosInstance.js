import axios from "axios";

const instance = axios.create({
  baseURL: "https://proyekakhirpraktcc-174534490336.us-central1.run.app",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken'); // sesuaikan dengan key token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

export default instance;
