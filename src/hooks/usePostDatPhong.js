import { useMutation } from "@tanstack/react-query"
import { quanLyDatPhongService } from "../services/QuanLyDatPhongService"
import { toast } from "react-toastify"

export const usePostDatPhong = () => {
    return useMutation({
        mutationFn: (payload) => {
            toast.success('Đặt phòng thành công!')
            return quanLyDatPhongService.postDatPhong(payload)
        }
    })
}