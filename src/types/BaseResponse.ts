export interface BaseResponse<T> {
    traceId: string;
    path: string;
    status: number;
    data: T;
}
