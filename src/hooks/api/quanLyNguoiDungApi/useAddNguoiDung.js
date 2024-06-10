import { useMutation } from "@tanstack/react-query"
import { quanLyUserServices } from "../../../services/QuanLyUser"

export const useAddNguoiDung = () => {
    return useMutation({
        mutationFn: (payload) => {
          console.log('Payload to API:', payload); // Debug log
          return quanLyUserServices.getAddNguoiDung(payload);
        },
        onSuccess: (data) => {
          console.log('User added successfully:', data); // Debug log
        },
        onError: (error) => {
          console.error('Error adding user:', error); // Debug log
        }
      });
}