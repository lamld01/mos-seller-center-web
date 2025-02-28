import API from "@/services/axiosInstance";
import { BaseResponse, PageResponse } from "@/types/BaseResponse";

export interface ProductResponse {
    id: number;
    name: string;
    productGroupId: number;
    description: string;
    price: number;
    status: 'ACTIVATED' | 'INACTIVATED';
    createdAt: string;
    updatedAt: string;
}

/**
 * Lấy danh sách sản phẩm có phân trang.
 * @param groupId ID nhóm sản phẩm (tùy chọn)
 * @param name Tên sản phẩm (tùy chọn)
 * @param categoryId ID danh mục (tùy chọn)
 * @param status Trạng thái sản phẩm (tùy chọn)
 * @param page Trang hiện tại (mặc định: 1)
 * @param size Số lượng sản phẩm mỗi trang (mặc định: 10)
 * @param sort Tiêu chí sắp xếp (mặc định: 'createdAt,desc')
 * @returns Danh sách sản phẩm có phân trang
 */
export const getPageProducts = async (
    groupId?: number,
    name?: string,
    categoryId?: number,
    status?: 'ACTIVATED' | 'INACTIVATED',
    page: number = 1,
    size: number = 10,
    sort: string = 'createdAt,desc'
): Promise<PageResponse<ProductResponse>> => {
    const response = await API.get<BaseResponse<PageResponse<ProductResponse>>>('products/page', {
        params: { groupId, name, categoryId, status, page, size, sort },
    });
    return response.data.data;
};

/**
 * Tạo sản phẩm mới.
 * @param productGroupId ID nhóm sản phẩm
 * @param name Tên sản phẩm
 * @param description Mô tả sản phẩm
 * @param price Giá sản phẩm
 * @param status Trạng thái sản phẩm
 * @returns Sản phẩm vừa tạo
 */
export const createProduct = async (
    productGroupId: number,
    name: string,
    description: string,
    price: number,
    status: 'ACTIVATED' | 'INACTIVATED'
): Promise<ProductResponse> => {
    const response = await API.post<BaseResponse<ProductResponse>>('products/create', {
        productGroupId, name, description, price, status
    });
    return response.data.data;
};

/**
 * Cập nhật thông tin sản phẩm.
 * @param id ID sản phẩm cần cập nhật
 * @param productGroupId ID nhóm sản phẩm mới (nếu có)
 * @param name Tên sản phẩm mới (nếu có)
 * @param description Mô tả sản phẩm mới (nếu có)
 * @param price Giá sản phẩm mới (nếu có)
 * @param status Trạng thái sản phẩm mới (nếu có)
 * @returns Sản phẩm sau khi cập nhật
 */
export const updateProduct = async (
    id: number,
    productGroupId?: number,
    name?: string,
    description?: string,
    price?: number,
    status?: 'ACTIVATED' | 'INACTIVATED'
): Promise<ProductResponse> => {
    const response = await API.put<BaseResponse<ProductResponse>>(`products/${id}/update`, {
        productGroupId, name, description, price, status
    });
    return response.data.data;
};
