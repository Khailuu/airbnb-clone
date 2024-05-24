import { useQuery } from "@tanstack/react-query"
import { quanLyPhongService } from "../services/QuanLyPhongService"

export const useGetPhong = () => {
    const q = useQuery({
        queryKey: ['GetPhong'],
        queryFn: () => {
            return quanLyPhongService.getPhongThue()
        }
    })
    return{
        ...q,
        data: q.data?.data.content
    }
}