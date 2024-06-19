import { useQuery } from "@tanstack/react-query";
import { quanLyPhongService } from "../../../services/QuanLyPhongService";

export const useGetPhongTheoMaViTri = (id) => {
  const q = useQuery({
    queryKey: ["GetPhongTheoViTri", id],
    queryFn: async () => {
      return await quanLyPhongService.getPhongTheoMaViTri(id);
    },
    // staleTime: 5 * 60 * 1000, // dữ liệu sẽ được coi là "fresh" trong 5 phút
    // cacheTime: 10 * 60 * 1000, // dữ liệu sẽ được cache trong 10 phút kể từ lần cuối sử dụng
    // refetchOnWindowFocus: false, // không refetch khi focus lại window
    // refetchOnMount: false, // không refetch khi component được mount lại
    // refetchOnReconnect: false, // không refetch khi kết nối lại mạng
  });

  return {
    ...q,
    data: q.data?.data.content,
  };
};
