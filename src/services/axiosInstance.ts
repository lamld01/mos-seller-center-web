import axios from "axios";
import Router from "next/router";
import { message } from "antd";
import ROUTES from "@/config/routes";
import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { getLocaleTranslation } from "@/utils/i18n"; // Hàm helper để lấy thông báo lỗi đa ngôn ngữ

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/v1/seller-center",
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);

        if (error.response?.status === 401) {
            store.dispatch(logout());
            Router.push(ROUTES.LOGIN);
        }

        return Promise.reject(error);
    }
);

export default API;
