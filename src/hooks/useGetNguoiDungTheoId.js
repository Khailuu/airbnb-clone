import { useQuery } from "@tanstack/react-query"
import { quanLyUserServices } from "../services/QuanLyUser"

export const useGetNguoiDungTheoId = (id) => {
    const q = useQuery({
        queryKey: ['UseGetNguoiDungTheoId'],
        queryFn: () => {
            return quanLyUserServices.getNguoiDungTheoId(id)
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}