import { QUAN_LY_NGUOI_DUNG } from "../constant/api";
import { apiInstance } from "../constant/apiInstance";

const api = apiInstance.create({
    baseURL: QUAN_LY_NGUOI_DUNG
})

export const quanLyNguoiDungServices = {
    dangNhap: (payload) => api.post('/signin', payload)
}