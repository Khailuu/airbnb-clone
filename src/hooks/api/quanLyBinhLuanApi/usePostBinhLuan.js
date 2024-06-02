import { useMutation } from "@tanstack/react-query"
import { quanLyBinhLuanService } from "../../../services/QuanLyBinhLuanService"
import { toast } from "react-toastify"

export const usePostBinhLuan = () => {
    return useMutation({
        mutationFn: async (payload) => {
            try {
                toast.success('Thêm bình luận thành công')
            return await quanLyBinhLuanService.postBinhLuan(payload)
            }
            catch (err) {
                console.log(err)
            }
        }
    })
}