import API from "@/services/axiosInstance";
import { BaseResponse } from "@/types/BaseResponse";

export interface StoreResponse {
    id: number;
    phoneNumber: string;
    name: string;
    status: 'ACTIVATED' | 'INACTIVATED';
    createdAt: string;
    updatedAt: string;
}

export interface StorePageResponse {
    data: StoreResponse[];
    page: number;
    totalPages: number;
    totalElements: number;
}

export const getPageStore = async (
    phoneNumber?: string,
    name?: string,
    page: number = 1,
    size: number = 10,
    sort: string = 'createdAt,desc'
): Promise<StorePageResponse> => {
    const response = await API.get<BaseResponse<StorePageResponse>>('/stores/page', {
        params: { phoneNumber, name, page, size, sort },
    });
    return response.data.data;
};

export const getStoreDetail = async (
    id?: string,
): Promise<StoreResponse> => {
    const response = await API.get<BaseResponse<StoreResponse>>(`/stores/${id}/detail`);
    return response.data.data;
};

export const createStore = async (
    phoneNumber?: string,
    name?: string,
    address?: string
): Promise<StoreResponse> => {
    const response = await API.post<BaseResponse<StoreResponse>>('/stores/create', { phoneNumber, name, address });
    return response.data.data;
};


export const updateStore = async (
    id?: string,
    phoneNumber?: string,
    name?: string
): Promise<StoreResponse> => {
    const response = await API.put<BaseResponse<StoreResponse>>(`/stores/${id}/update`, { phoneNumber, name });
    return response.data.data;
};
