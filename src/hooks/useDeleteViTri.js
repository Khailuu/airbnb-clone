import { useMutation } from "@tanstack/react-query"
import { quanLyViTriService } from "../services/QuanLyViTriService"

export const useDeleteViTri = () => {
    return useMutation({
        mutationFn: (id) => {
            return quanLyViTriService.deleteViTri(id)
        }
    })
}