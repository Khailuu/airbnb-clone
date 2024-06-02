import { useMutation } from "@tanstack/react-query"
import { quanLyPhongService } from "../../../services/QuanLyPhongService"

export const usePostPhong = () => {
    return useMutation({
        mutationFn: (payload) => {
            return quanLyPhongService.addPhong(payload)
        }
    })
}