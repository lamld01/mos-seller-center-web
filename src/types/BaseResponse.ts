
export interface BaseResponse<T> {
    traceId: string;
    path: string;
    status: number;
    data: T;
}

export interface PageResponse<T> {
    data: T[];
    page: number;
    totalPages: number;
    totalElements: number;
}