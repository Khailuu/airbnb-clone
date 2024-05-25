import { useQuery } from "@tanstack/react-query"
import { quanLyPhongService } from "../services/QuanLyPhongService"

export const useGetPhongTheoId = (id) => {
    const q = useQuery({
        queryKey: ['GetPhongTheoId'],
        queryFn: () => {
            return quanLyPhongService.getPhongThueTheoId(id)
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}