import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";  // API Base URL
const FILE_BASE_URL = "http://localhost:5000/";    // File Base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach token to every request if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { axiosInstance, FILE_BASE_URL };
