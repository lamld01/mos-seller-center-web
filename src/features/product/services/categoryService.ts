import API from "@/services/axiosInstance";
import { BaseResponse } from "@/types/BaseResponse";

export type ActiveStatus = "ACTIVATED" | "INACTIVATED";
export type ProductCategoryType = "FOOD" | "ELECTION" | "MEDICAL" | "BEAUTY" | "ENTERTAINMENT" | "OTHERS";

export interface CategoryResponse {
    id: number;
    name: string;
    description?: string;
    parentId?: number;
    status: ActiveStatus;
    type: ProductCategoryType;
}

/**
 * Lấy danh sách danh mục.
 * @param parentId ID danh mục cha (nếu có)
 * @param name Tên danh mục (nếu có)
 * @param type Loại danh mục (nếu có)
 * @param status Trạng thái danh mục (nếu có)
 * @returns Danh sách danh mục
 */
export const getAllCategories = async (
    parentId?: number,
    name?: string,
    type?: ProductCategoryType,
    status?: ActiveStatus
): Promise<CategoryResponse[]> => {
    const response = await API.get<BaseResponse<CategoryResponse[]>>("categories/all", {
        params: { parentId, name, type, status },
    });
    return response.data.data;
};
