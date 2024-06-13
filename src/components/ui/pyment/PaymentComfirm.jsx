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

  useEffect(() => {
    const { orderId, resultCode } = queryString.parse(location.search);

    if (resultCode === '0') { // giả sử '0' là mã thành công
      const bookingData = JSON.parse(localStorage.getItem('bookingData'));

      mutation.mutate(bookingData, {
        onSuccess: () => {
          toast.success("Đặt phòng thành công!");
          navigate(PATH.DASHBOARD); // chuyển hướng đến bảng điều khiển hoặc trang khác
        },
        onError: (error) => {
          toast.error("Đặt phòng thất bại!");
        }
      });
    } else {
      toast.error("Thanh toán thất bại!");
    }
  }, [location.search, mutation, navigate]);

  return (
    <div>
      <h2>Đang xử lý thanh toán...</h2>
    </div>
  );
};
