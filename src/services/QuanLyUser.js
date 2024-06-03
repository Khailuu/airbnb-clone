import { QUAN_LY_USER_API, apiInstance } from "../constant";

const api = apiInstance.create({
    baseURL: QUAN_LY_USER_API
})

export const quanLyUserServices = {
    getNguoiDung: () => api.get(),
    getNguoiDungTheoId: (id) => api.get(`/${id}`),
    uploadHinh: (payload) => {
        return api.post('/upload-avatar', payload)
    },
    deleteNguoiDung: (id) => api.delete(`?id=${id}`),
    editNguoiDung: (id, payload) => {
        return api.put(`/${id}`, payload);
    }
}