import axios from "axios";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useGetDatPhong } from "../../../hooks/api/quanLyDatPhongApi/useGetDatPhong";
import moment from "moment";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PATH } from "../../../constant";
import { Button, Form } from "antd";
import { toast } from "react-toastify";
import { usePostDatPhong } from "../../../hooks/api/quanLyDatPhongApi/usePostDatPhong";

export const CalenderComponent = ({ chiTietPhong, maPhong }) => {
  const navigate = useNavigate();
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);
  const { data: phongDat } = useGetDatPhong();
  const maPhongParse = parseInt(maPhong);
  const [ngayNhanPhong, setNgayNhanPhong] = useState('');
  const [ngayTraPhong, setNgayTraPhong] = useState('');
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const [isOverlap, setIsOverlap] = useState(false);

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
  }, [state, phongDat, maPhongParse]);

  const buttonClass = isOverlap
    ? "w-full bg-gray-400 cursor-not-allowed text-black rounded-[6px]"
    : "w-full bg-rose-500 text-white rounded-[6px]";

  const mutation = usePostDatPhong();

  const formik = useFormik({
    initialValues: {
      id: 0,
      maPhong: maPhong,
      ngayDen: moment(ngayNhanPhong).format("YYYY/MM/DD"),
      ngayDi: moment(ngayTraPhong).format("YYYY/MM/DD"),
      soLuongKhach: 1,
      maNguoiDung: userLogin?.user.id,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        localStorage.setItem('bookingData', JSON.stringify(values));
        const paymentResponse = await axios.post("https://serverpayment.vercel.app/payment", {
          amount: chiTietPhong?.giaTien * 2300,
          orderInfo: "Thanh toán đặt phòng",
          redirectUrl: `${window.location.origin}/payment-confirmation`,
          ipnUrl: 'https://webhook.site/5254fac2-369f-4f25-b13b-0ad3a1f1e5e0'
        });
        
        const { payUrl } = paymentResponse.data;
        window.location.href = payUrl;
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  return (
    <div className="py-4 px-5 border-2 border-black border-solid rounded-lg">
      <div className="font-semibold text-lg pb-4 border-b border-black border-solid">
        Chọn ngày nhận phòng - trả phòng
      </div>
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
        minDate={new Date()}
        rangeColors={["#262626"]}
      />
      <Form
        className="mt-5"
        onFinish={formik.handleSubmit}
      >
        <Form.Item>
          <button className={buttonClass} disabled={isOverlap} type="submit">Đặt phòng</button>
        </Form.Item>
      </Form>
    </div>
  );
};
