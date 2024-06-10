import { QUAN_LY_PHONG_API, apiInstance } from "../constant";

const api = apiInstance.create({
    baseURL: QUAN_LY_PHONG_API
})

export const quanLyPhongService = {
    getPhongThue: () => api.get(),
    getPhongTheoMaViTri: (id) => api.get(`/lay-phong-theo-vi-tri?maViTri=${id}`),
    getPhongThueTheoId: (id) => api.get(`/${id}`),
    deletePhong: (id) => api.delete(`/${id}`),
    addPhong: (payload) => api.post('', payload),
    editPhong: (id, payload) => {
        return api.put(`/${id}`, payload);
    }
}