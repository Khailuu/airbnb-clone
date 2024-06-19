import { useQuery } from "@tanstack/react-query";
import { quanLyPhongService } from "../../../services/QuanLyPhongService";

export const useGetPhongTheoId = (id) => {
  const q = useQuery({
    queryKey: ["GetPhongTheoId"],
    queryFn: async () => {
      return await quanLyPhongService.getPhongThueTheoId(id);
    },
  });
  return {
    ...q,
    data: q.data?.data.content,
  };
};
