import API from "@/services/axiosInstance";
import {BaseResponse, PageResponse} from "@/types/BaseResponse";

export interface ProductGroupResponse {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    status: 'ACTIVATED' | 'INACTIVATED';
    createdAt: string;
    updatedAt: string;
}

/**
 * Lấy danh sách sản phẩm có phân trang.
 * @param name Tên sản phẩm (tùy chọn)
 * @param categoryId ID danh mục (tùy chọn)
 * @param status Trạng thái sản phẩm (tùy chọn)
 * @param page Trang hiện tại (mặc định: 1)
 * @param size Số lượng sản phẩm mỗi trang (mặc định: 10)
 * @param sort Tiêu chí sắp xếp (mặc định: 'createdAt,desc')
 * @returns Danh sách sản phẩm có phân trang
 */
export const getPageProductGroups = async (
    name?: string,
    categoryId?: number,
    status?: 'ACTIVATED' | 'INACTIVATED',
    page: number = 1,
    size: number = 10,
    sort: string = 'createdAt,desc'
): Promise<PageResponse<ProductGroupResponse>> => {
    const response = await API.get<BaseResponse<PageResponse<ProductGroupResponse>>>('/product-group/page', {
        params: { name, categoryId, status, page, size, sort },
    });
    return response.data.data;
};

/**
 * Tạo sản phẩm mới.
 * @param categoryId ID danh mục
 * @param name Tên sản phẩm
 * @param description Mô tả sản phẩm
 * @param price Giá sản phẩm
 * @param status Trạng thái sản phẩm
 * @returns Sản phẩm vừa tạo
 */
export const createProductGroup = async (
    categoryId: number,
    name: string,
    description: string,
    price: number,
    status: 'ACTIVATED' | 'INACTIVATED'
): Promise<ProductGroupResponse> => {
    const response = await API.post<BaseResponse<ProductGroupResponse>>('/product-group/create', {
        categoryId, name, description, price, status
    });
    return response.data.data;
};

/**
 * Cập nhật thông tin sản phẩm.
 * @param id ID sản phẩm cần cập nhật
 * @param categoryId ID danh mục mới (nếu có)
 * @param name Tên sản phẩm mới (nếu có)
 * @param description Mô tả sản phẩm mới (nếu có)
 * @param price Giá sản phẩm mới (nếu có)
 * @param status Trạng thái sản phẩm mới (nếu có)
 * @returns Sản phẩm sau khi cập nhật
 */
export const updateProductGroup = async (
    id: number,
    categoryId?: number,
    name?: string,
    description?: string,
    price?: number,
    status?: 'ACTIVATED' | 'INACTIVATED'
): Promise<ProductGroupResponse> => {
    const response = await API.put<BaseResponse<ProductGroupResponse>>(`/product-group/${id}/update`, {
        categoryId, name, description, price, status
    });
    return response.data.data;
};
