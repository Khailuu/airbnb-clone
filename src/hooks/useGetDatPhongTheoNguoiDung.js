import { useQuery } from "@tanstack/react-query"
import { quanLyDatPhongService } from "../services/QuanLyDatPhongService"

export const useGetDatPhongTheoNguoiDung = (id) => {
    const q = useQuery({
        queryKey: ['GetDatPhongTheoNguoiDung'],
        queryFn: () => {
            return quanLyDatPhongService.getDatPhongTheoNguoiDung(id)
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}