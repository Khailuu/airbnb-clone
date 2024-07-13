import { useQuery } from "@tanstack/react-query";
import { quanLyPhongService } from "../../../services/QuanLyPhongService";
import { sleep } from "../../../utils/sleep";

export const useGetPhong = () => {
  const q = useQuery({
    queryKey: ["GetPhong"],
    queryFn: async () => {
      await sleep()
      return await quanLyPhongService.getPhongThue();
    },
  });
  return {
    ...q,
    data: q.data?.data.content,
  };
};
