import { useMutation } from "@tanstack/react-query"
import { quanLyViTriService } from "../services/QuanLyViTriService"

export const usePostViTri = () => {
    return useMutation({
        mutationFn: (payload) => {
            return quanLyViTriService.postViTri(payload)
        }
    })
}