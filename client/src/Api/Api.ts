import axios from "axios";

const baseURL = "http://localhost:8000/api";

const token = JSON.parse(localStorage.getItem("token") as string);

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default axiosInstance;
