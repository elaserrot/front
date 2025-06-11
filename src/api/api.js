import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
const API = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

API.interceptors.request.use(async (config) => {
    try {
        const token = await localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } catch (error) {
        return null;
    }

});

export default API;