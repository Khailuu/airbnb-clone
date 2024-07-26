import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePostDatPhong } from "../../../hooks/api/quanLyDatPhongApi/usePostDatPhong";
import { PATH } from "../../../constant";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";

export const PaymentComfirm = () => {
  const navigate = useNavigate();
  const mutation = usePostDatPhong();
  const { t } = useTranslation();

  useEffect(() => {
    const return_code = "1";
    if (return_code) {
      const bookingData = JSON.parse(localStorage.getItem("bookingData"));

      if (bookingData) {
        mutation.mutate(bookingData, {
          onSuccess: () => {
            toast.success(`${t("Đặt phòng thành công!")}`);
            navigate(PATH.payment);
          },
          onError: (error) => {
            console.error("Mutation error:", error);
            toast.error("Đặt phòng thất bại!");
          },
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
    <div className="flex items-center flex-col justify-center">
      <h2 className="text-rose-500 text-[40px]">
        {t("Đang xử lý thanh toán...")}
      </h2>
      <div className="text-[24px] text-rose-500">
        <Spin
          className="custom-spin"
          tip="Loading"
          size="large"
          style={{ colorPrimary: "#f43f5e !important" }}
        ></Spin>
      </div>
    </div>
  );
};
