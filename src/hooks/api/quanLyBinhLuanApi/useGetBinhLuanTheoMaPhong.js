import { useQuery } from "@tanstack/react-query"
import { quanLyBinhLuanService } from "../../../services/QuanLyBinhLuanService"

export const useGetBinhLuanTheoMaPhong = (id) => {
    const q = useQuery({
        queryKey: ['GetBinhLuanTheoMaPhong'],
        queryFn: () => {
            return quanLyBinhLuanService.getBinhLuanTheoMaPhong(id)
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}