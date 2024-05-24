import { QUAN_LY_VI_TRI_API, apiInstance } from "../constant";

const api = apiInstance.create({
    baseURL: QUAN_LY_VI_TRI_API
})

export const quanLyViTriService = {
    getViTri: () => api.get(),
    getPhanTrangTimKiem: () => api.get('/phan-trang-tim-kiem?pageIndex=1&pageSize=20')
}