import { useMutation } from "@tanstack/react-query"
import { quanLyUserServices } from "../../../services/QuanLyUser"
import { toast } from "react-toastify"

export const useUploadHinh = () => {
    return useMutation({
        mutationFn: async (payload) => {
            try {
                return await quanLyUserServices.uploadHinh(payload)
            }
            catch(err) {
                toast.error(err?.respone?.data?.content)
            }
        }
    })
}