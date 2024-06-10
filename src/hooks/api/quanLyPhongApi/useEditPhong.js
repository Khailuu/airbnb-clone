import { quanLyPhongService } from "../../../services/QuanLyPhongService"
import { useMutation } from "@tanstack/react-query"

export const useEditPhong = () => {
    return useMutation({
        mutationFn: ({ id, payload }) => {
            return quanLyPhongService.editPhong(id, payload)
            
        }
    })
}