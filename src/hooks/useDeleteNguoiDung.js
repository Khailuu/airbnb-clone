import { useMutation } from "@tanstack/react-query";
import { quanLyUserServices } from "../services/QuanLyUser";

export const useDeleteNguoiDung = () => {
    return useMutation({
        mutationFn:  (id) => {
            return quanLyUserServices.deleteNguoiDung(id)
        }
    })
};
