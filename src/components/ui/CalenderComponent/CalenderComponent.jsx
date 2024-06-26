import axios from "axios";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useGetDatPhong } from "../../../hooks/api/quanLyDatPhongApi/useGetDatPhong";
import moment from "moment";
import { useFormik } from "formik";
import { getUserLogin } from "../../../utils/getUserLogin";
import { usePostDatPhong } from "../../../hooks/api/quanLyDatPhongApi/usePostDatPhong";
import "../../../assets/style.css";
import { Button, Form } from "antd";
import { useTranslation } from "react-i18next";

export const CalenderComponent = ({ chiTietPhong, maPhong }) => {
  const { t } = useTranslation();
  const { data: phongDat } = useGetDatPhong();
  const maPhongParse = parseInt(maPhong);
  const [ngayNhanPhong, setNgayNhanPhong] = useState("");
  const [ngayTraPhong, setNgayTraPhong] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [isOverlap, setIsOverlap] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
    setNgayNhanPhong(moment(ranges.selection.startDate).format("YYYY-MM-DD"));
    setNgayTraPhong(moment(ranges.selection.endDate).format("YYYY-MM-DD"));
  };

  const isDateRangeOverlap = (start1, end1, start2, end2) => {
    return start1.isSameOrBefore(end2) && start2.isSameOrBefore(end1);
  };

  useEffect(() => {
    const parseStartDate = moment(state[0].startDate);
    const parseEndDate = moment(state[0].endDate);
    let overlap = false;

    phongDat?.forEach((phong) => {
      if (phong.maPhong === maPhongParse) {
        const ngayDen = moment(phong.ngayDen);
        const ngayDi = moment(phong.ngayDi);
        if (isDateRangeOverlap(parseStartDate, parseEndDate, ngayDen, ngayDi)) {
          overlap = true;
        }
      }
    });

    setIsOverlap(overlap);
  }, [state, phongDat]);

  const mutation = usePostDatPhong();
  const formik = useFormik({
    initialValues: {
      maPhong: maPhongParse,
      ngayDen: ngayNhanPhong,
      ngayDi: ngayTraPhong,
      soLuongKhach: 1,
      maNguoiDung: getUserLogin()?.user?.id,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        localStorage.setItem("bookingData", JSON.stringify(values));
        const paymentResponse = await axios.post(
          "https://server-lovat-theta.vercel.app/payment",
          {
            amount: chiTietPhong?.giaTien * 10000,
            orderInfo: "Thanh toán đặt phòng",
            redirectUrl: `${window.location.origin}/payment-confirm`,
            cancelUrl: `${window.location.origin}/details`,
            ipnUrl: "https://webhook.site/5254fac2-369f-4f25-b13b-0ad3a1f1e5e0",
          }
        );

        const { order_url } = paymentResponse.data;

        if (order_url) {
          window.location.href = order_url;
        } else {
          console.error("Order URL không tồn tại");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleFormSubmit = () => {
    if (isOverlap) {
      alert("Phòng đã được đặt trong khoảng thời gian này.");
    } else {
      setIsLoading(true);
      formik.handleSubmit();
    }
  };

  return (
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
        className="date-range w-full"
      />
      <Form layout="vertical" onSubmitCapture={handleFormSubmit}>
        <p>{t("Số lượng khách")}</p>
        <Form.Item>
          <input
            type="number"
            onChange={formik.handleChange}
            className="border-[1px] border-black p-[12px] rounded-[5px] my-[10px] w-[100px]"
            name="soLuongKhach"
            placeholder="1"
            min={1}
            max={2}
          />
        </Form.Item>
        {isOverlap && (
          <p className="text-red-500 mb-[20px]">{t("Hết phòng!")}</p>
        )}
        <Button
          htmlType="submit"
          className="w-full bg-rose-500 text-white transition-all ease-in-out"
          disabled={isOverlap || isLoading}
        >
          {isLoading ? `${"Đang xử lý..."}` : `${t("Đặt phòng")}`}
        </Button>
      </Form>
    </div>
  );
};
