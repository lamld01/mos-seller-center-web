import API from '@/services/axiosInstance';
import { BaseResponse } from '@/types/BaseResponse';
import {User} from "@/types/User";

export interface AuthResponse {
    token: string;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
    const response = await API.post<BaseResponse<AuthResponse>>('public/auth/login', { username, password });
    return response.data.data; // Lấy `data` từ `BaseResponse`
};

export const getUserInfo = async (): Promise<User> => {
    const response = await API.get<BaseResponse<User>>('/user/info');
    return response.data.data; // Lấy `data` từ `BaseResponse`
};