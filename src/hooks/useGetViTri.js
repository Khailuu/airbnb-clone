import { useQuery } from "@tanstack/react-query"
import { quanLyViTriService } from "../services/QuanLyViTriService"

export const useGetViTri = () => {
    const q = useQuery({
        queryKey: ['GetViTri'],
        queryFn: () => {
            return quanLyViTriService.getViTri()
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}