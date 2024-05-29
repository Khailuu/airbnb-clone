import { useMutation } from "@tanstack/react-query"
import { quanLyDatPhongService } from "../services/QuanLyDatPhongService"

export const useDeletePhongDaDat = () => {
    return useMutation({
        mutationFn: async (id)=>{
            return await quanLyDatPhongService.deletePhongDaDat(id)
        }
    })
}