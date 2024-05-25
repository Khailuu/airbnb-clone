import { QUAN_LY_BINH_LUAN_API, apiInstance } from "../constant";

const api = apiInstance.create({
    baseURL: QUAN_LY_BINH_LUAN_API
})

export const quanLyBinhLuanService = {
    getBinhLuanTheoMaPhong: (id) => api.get(`/lay-binh-luan-theo-phong/${id}`),
    postBinhLuan: (payload) => api.post('', payload),
    deleteBinhLuan: () => api.delete()
}