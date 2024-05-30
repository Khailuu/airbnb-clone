import { useMutation } from "@tanstack/react-query"
import { quanLyUserServices } from "../services/QuanLyUser"

export const useEditNguoiDung = () => {
    return useMutation({
        mutationFn: ({ id, payload }) => {
            console.log(payload)
            console.log(id)
            return quanLyUserServices.editNguoiDung(id, payload)
        }
    })
}