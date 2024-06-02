import { useMutation } from "@tanstack/react-query"
import { quanLyViTriService } from "../../../services/QuanLyViTriService"

export const useEditViTri = () =>{
    return useMutation({
        mutationFn: ({id, payload}) => {
            return quanLyViTriService.editViTri(id, payload)
        }
    })
}