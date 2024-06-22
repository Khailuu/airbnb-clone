import { useMutation } from "@tanstack/react-query"
import { quanLyBinhLuanService } from "../../../services/QuanLyBinhLuanService"
import { sleep } from "../../../utils/sleep"

export const usePostBinhLuan = () => {
    return useMutation({
        mutationFn: async (payload) => {
            try {
                
                await sleep()
            return await quanLyBinhLuanService.postBinhLuan(payload)
            }
            catch (err) {
                console.log(err)
            }
        }
    })
}