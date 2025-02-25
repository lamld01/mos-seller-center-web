import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/v1/seller-center',
});


API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default API;
