import { useQuery } from "@tanstack/react-query"
import { quanLyDatPhongService } from "../../../services/QuanLyDatPhongService"

export const useGetDatPhong = () => {
    const q = useQuery({
        queryKey: ['GetDatPhong'],
        queryFn: () => {
            return quanLyDatPhongService.getDatPhong()
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}