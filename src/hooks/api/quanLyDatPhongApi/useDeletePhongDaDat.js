import { useMutation } from "@tanstack/react-query"
import { quanLyDatPhongService } from "../../../services/QuanLyDatPhongService"
import { sleep } from "../../../utils/sleep"

export const useDeletePhongDaDat = () => {
    return useMutation({
        mutationFn: async (id)=>{
            try {
                await sleep()
                return await quanLyDatPhongService.deletePhongDaDat(id)
            } catch (err) {
                console.log(err)
            }
        }
    })
}