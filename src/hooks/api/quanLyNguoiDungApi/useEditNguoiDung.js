import { useMutation } from "@tanstack/react-query"
import { quanLyUserServices } from "../../../services/QuanLyUser"
import { sleep } from "../../../utils/sleep"


export const useEditNguoiDung = () => {
    return useMutation({
        mutationFn: async ({ id, payload }) => {
            await sleep()
            return await quanLyUserServices.editNguoiDung(id, payload)
        }
    })
}