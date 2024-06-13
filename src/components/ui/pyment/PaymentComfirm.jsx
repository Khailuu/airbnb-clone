import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePostDatPhong } from "../../../hooks/api/quanLyDatPhongApi/usePostDatPhong";
import queryString from 'query-string';
import { PATH } from '../../../constant';

export const PaymentComfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mutation = usePostDatPhong();
  console.log(location)

  useEffect(() => {
    // const { orderId, return_code } = queryString.parse(location.search);
    // console.log("Query params:", { orderId, return_code });
    const return_code = "1"
    if (return_code) { // Check if '1' indicates a successful payment
      const bookingData = JSON.parse(localStorage.getItem('bookingData'));
      console.log("Booking data:", bookingData);

      if (bookingData) {
        mutation.mutate(bookingData, {
          onSuccess: () => {
            toast.success("Đặt phòng thành công!");
            navigate(PATH.DASHBOARD); // Redirect to dashboard or any other page
          },
          onError: (error) => {
            console.error("Mutation error:", error);
            toast.error("Đặt phòng thất bại!");
          }
        });
      } else {
        console.error("No booking data found in localStorage.");
        toast.error("Không tìm thấy dữ liệu đặt phòng.");
      }
    } else {
      console.error("Payment failed with return_code:", return_code);
      toast.error("Thanh toán thất bại!");
    }
  }, []);

  return (
    <div>
      <h2>Đang xử lý thanh toán...</h2>
    </div>
  );
};
