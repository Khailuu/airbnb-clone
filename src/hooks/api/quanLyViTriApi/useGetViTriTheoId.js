import { useQuery } from "@tanstack/react-query"
import { quanLyViTriService } from "../../../services/QuanLyViTriService"

export const useGetViTriTheoId = (id) => {
    const q = useQuery({
        queryKey: ['GetViTriTheoId'],
        queryFn: () => {
            return quanLyViTriService.getViTriTheoId(id)
        }
    })
    return {
        ...q,
        data: q.data?.data.content
    }
}