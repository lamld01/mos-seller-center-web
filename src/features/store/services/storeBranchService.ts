import API from "@/services/axiosInstance";
import {BaseResponse, PageResponse} from "@/types/BaseResponse";

export interface StoreBranchResponse {
    id: number;
    phoneNumber: string;
    name: string;
    address: string;
    status: "OPENED" | "CLOSED";
    createdAt: string;
    updatedAt: string;
}

/**
 * Lấy danh sách cửa hàng có phân trang
 */
export const getPageStoreBranch = async (
    storeId: number,
    page: number = 1,
    size: number = 10,
    sort: string = "createdAt,desc",
    phoneNumber?: string,
    name?: string,
    status?: "OPENED" | "CLOSED"
): Promise<PageResponse<StoreBranchResponse> | null> => {

    const response = await API.get<BaseResponse<PageResponse<StoreBranchResponse>>>(
        "/store-branches/page",
        {params: {storeId, phoneNumber, name, page, size, sort, status}}
    );
    return response.data.data;
};

/**
 * Lấy chi tiết cửa hàng theo ID
 */
export const getStoreBranchDetail = async (id: string): Promise<StoreBranchResponse | null> => {

    const response = await API.get<BaseResponse<StoreBranchResponse>>(
        `/store-branches/${id}/detail`
    );
    return response.data.data;
};

/**
 * Tạo mới cửa hàng
 */
export const createStoreBranch = async (
    storeId: number,
    phoneNumber: string,
    name: string,
    address: string
): Promise<StoreBranchResponse | null> => {
    const response = await API.post<BaseResponse<StoreBranchResponse>>(
        "/store-branches/create",
        {storeId, phoneNumber, name, address}
    );
    return response.data.data;
};

/**
 * Cập nhật thông tin cửa hàng
 */
export const updateStoreBranch = async (
    id: number,
    phoneNumber: string,
    address: string,
    name: string,
    status: "OPENED" | "CLOSED"
): Promise<StoreBranchResponse | null> => {
    const response = await API.put<BaseResponse<StoreBranchResponse>>(
        `/store-branches/${id}/update`,
        {phoneNumber, name, address, status}
    );
    return response.data.data;
};
