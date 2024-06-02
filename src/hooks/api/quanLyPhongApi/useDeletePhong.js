import { useMutation } from "@tanstack/react-query"
import { quanLyPhongService } from "../../../services/QuanLyPhongService"

export const useDeletePhong = () => {
    return useMutation({
        mutationFn: (id) => {
            return quanLyPhongService.deletePhong(id)
        }
    })
}