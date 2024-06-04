import { useMutation } from "@tanstack/react-query"
import { quanLyBinhLuanService } from "../../../services/QuanLyBinhLuanService"

export const useDeleteBinhLuan = () => {
    return useMutation({
        mutationFn: (id) => {
            return quanLyBinhLuanService.deleteBinhLuan(id)
        }
    })
}