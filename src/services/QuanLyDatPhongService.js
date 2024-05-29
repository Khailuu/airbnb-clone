import { QUAN_LY_DAT_PHONG_API, apiInstance } from "../constant";

const api = apiInstance.create({
    baseURL: QUAN_LY_DAT_PHONG_API
})

export const quanLyDatPhongService = {
    getDatPhong: () => api.get(),
    getDatPhongTheoNguoiDung: (id) => api.get(`lay-theo-nguoi-dung/${id}`),
    postDatPhong: (payload) => api.post('', payload),
    deletePhongDaDat: (id) => api.delete(`/${id}`)
}