import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../../../constant";
import { useTranslation } from "react-i18next";

export const PaymentComponent = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center my-[40px]">
      <img
        className="w-[50%]"
        src="../../../../images/payment-success.jpg"
        alt="image success"
      />
      <h2 className="mb-[20px] text-rose-500 text-[40px]">
        {t("Đơn hàng của bạn đã được thanh toán thành công!")}
      </h2>
      <NavLink
        to={PATH.home}
        style={{ textDecoration: "underline" }}
        className="hover:text-rose-500 transition-all ease-in-out"
      >
        {t("Quay lại trang chủ")}
      </NavLink>
    </div>
  );
};
