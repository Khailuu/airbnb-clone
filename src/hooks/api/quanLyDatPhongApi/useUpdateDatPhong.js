import { useMutation } from "@tanstack/react-query";
import { quanLyDatPhongService } from "../../../services/QuanLyDatPhongService";
import { toast } from "react-toastify";

export const useUpdateDatPhong = () => {
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      try {
        return await quanLyDatPhongService.updateDatPhong(id, payload);
      } catch (err) {
        console.log(err);
        throw err; // Ensure errors are propagated
      }
    },
    onSuccess: () => {
      toast.success("Cập nhật thành công!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Cập nhật thất bại!");
    },
  });
};
