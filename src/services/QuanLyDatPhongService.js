import { QUAN_LY_DAT_PHONG_API, apiInstance } from "../constant";

const api = apiInstance.create({
    baseURL: QUAN_LY_DAT_PHONG_API
})

export const quanLyDatPhongService = {
    getDatPhong: () => api.get(),
    postDatPhong: (payload) => api.post('', payload)
}