import axios from "axios";
import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useGetDatPhong } from "../../../hooks/api/quanLyDatPhongApi/useGetDatPhong";
import moment from "moment";
import { useFormik } from "formik";
import { getUserLogin } from "../../../utils/getUserLogin";
import { usePostDatPhong } from "../../../hooks/api/quanLyDatPhongApi/usePostDatPhong";
import '../../../assets/style.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PATH } from "../../../constant";
import { Button, Form } from "antd";

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
        const paymentResponse = await axios.post("https://server-lovat-theta.vercel.app", {
          amount: chiTietPhong?.giaTien * 100,
          orderInfo: "Thanh toán đặt phòng",
          maPhong: values.maPhong,
          ngayDen: values.ngayDen,
          ngayDi: values.ngayDi,
          soLuongKhach: values.soLuongKhach,
          maNguoiDung: values.maNguoiDung,
          redirectUrl: "https://airbnb-capstone.vercel.app/payment",
          ipnUrl: 'https://webhook.site/5254fac2-369f-4f25-b13b-0ad3a1f1e5e0'
        });

        const { payUrl } = paymentResponse.data;

        // Chuyển hướng người dùng đến URL thanh toán MoMo
        window.location.href = payUrl;
      } catch (error) {
        console.error("Error processing payment:", error);
      }
    },
  });

  const handleFormSubmit = () => {
    if (isOverlap) {
      alert('Phòng đã được đặt trong khoảng thời gian này.');
    } else {
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
        className="date-range"
      />
      <Form layout="vertical" onSubmitCapture={handleFormSubmit}>
        <Form.Item label="Số lượng khách">
          <input
            type="number"
            value={formik.values.soLuongKhach}
            onChange={formik.handleChange}
            name="soLuongKhach"
            min="1"
            max="10"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" disabled={isOverlap}>
          Đặt phòng
        </Button>
      </Form>
    </div>
  );
};
