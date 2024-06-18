import { useMutation } from "@tanstack/react-query"
import { quanLyDatPhongService } from "../../../services/QuanLyDatPhongService"
import { toast } from "react-toastify"
import { sleep } from "../../../utils/sleep"

export const usePostDatPhong = () => {
    return useMutation({
        mutationFn: async (payload) => {
           try{
            await sleep()
            return await quanLyDatPhongService.postDatPhong(payload)
           }
           catch(err) {
            console.log(err)
           }
        }
    })
}