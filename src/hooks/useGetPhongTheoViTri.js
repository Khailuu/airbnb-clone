import { useQuery } from "@tanstack/react-query"
import { quanLyPhongService } from "../services/QuanLyPhongService"

export const useGetPhongTheoMaViTri = (id) => {
    const q = useQuery({
        queryKey: ['GetPhongTheoViTri'],
        queryFn: () => {
            return quanLyPhongService.getPhongTheoMaViTri(id)
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}