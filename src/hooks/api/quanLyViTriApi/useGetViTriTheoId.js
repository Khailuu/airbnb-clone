import { useQuery } from "@tanstack/react-query";
import { quanLyViTriService } from "../../../services/QuanLyViTriService";

export const useGetViTriTheoId = (id) => {
  const q = useQuery({
    queryKey: ["GetViTriTheoId"],
    queryFn: async () => {
      return await quanLyViTriService.getViTriTheoId(id);
    },
    // staleTime: 5 * 60 * 1000, // dữ liệu sẽ được coi là "fresh" trong 5 phút
    // cacheTime: 10 * 60 * 1000, // dữ liệu sẽ được cache trong 10 phút kể từ lần cuối sử dụng
    // refetchOnWindowFocus: false, // không refetch khi focus lại window
    // refetchOnMount: false, // không refetch khi component được mount lại
  });
  return {
    ...q,
    data: q.data?.data.content,
  };
};
