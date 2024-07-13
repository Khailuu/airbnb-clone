import { useQuery } from "@tanstack/react-query";
import { quanLyPhongService } from "../../../services/QuanLyPhongService";
import { sleep } from "../../../utils/sleep";

export const useGetPhongTheoMaViTri = (id) => {
  const q = useQuery({
    queryKey: ["GetPhongTheoViTri", id],
    queryFn: async () => {
      await sleep();
      return await quanLyPhongService.getPhongTheoMaViTri(id);
    },
  });

  return {
    ...q,
    data: q.data?.data.content,
  };
};
