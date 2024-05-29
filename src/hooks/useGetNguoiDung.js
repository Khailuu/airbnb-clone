import { useQuery } from "@tanstack/react-query"
import { quanLyUserServices } from "../services/QuanLyUser"

export const useGetNguoiDung = () => {
    const q = useQuery({
        queryKey: ['GetNguoiDung'],
        queryFn: () => {
            return quanLyUserServices.getNguoiDung()
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}