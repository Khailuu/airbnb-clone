import { useMutation } from "@tanstack/react-query"
import { quanLyUserServices } from "../../../services/QuanLyUser"

export const useEditNguoiDung = () => {
    return useMutation({
        mutationFn: ({ id, payload }) => {
            return quanLyUserServices.editNguoiDung(id, payload)
        }
    })
}