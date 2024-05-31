import { QUAN_LY_VI_TRI_API, apiInstance } from "../constant";

const api = apiInstance.create({
    baseURL: QUAN_LY_VI_TRI_API
})

export const quanLyViTriService = {
    getViTri: () => api.get(),
    getViTriTheoId: (id) => api.get(`/${id}`),
    getPhanTrangTimKiem: () => api.get('/phan-trang-tim-kiem?pageIndex=1&pageSize=20'),
    postViTri: (payload) => api.post('', payload),
    deleteViTri: (id) => api.delete(`/${id}`),
    editViTri: (id, payload) => api.put(`/${id}`, payload)
}