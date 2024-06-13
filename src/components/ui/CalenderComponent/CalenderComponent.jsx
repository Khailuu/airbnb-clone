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
import { toast } from "react-toastify";

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
        const paymentResponse = await axios.post("https://serverpayment.vercel.app/payment", {
          amount: chiTietPhong?.giaTien * 100,
          orderInfo: "Thanh toán đặt phòng",
          redirectUrl: "https://airbnb-capstone.vercel.app/payment",
          ipnUrl: 'https://webhook.site/5254fac2-369f-4f25-b13b-0ad3a1f1e5e0'
        });
        
        const { payUrl } = paymentResponse.data;
        console.log(paymentResponse.data)

        // Chuyển hướng người dùng đến URL thanh toán MoMo
        window.location.href = payUrl;

        // Sau khi hoàn thành thanh toán, bạn có thể gọi API đặt phòng nếu cần
        mutation.mutate(values, {
          onSuccess: () => {
            toast.success("Đặt phòng thành công!") // Điều chỉnh đường dẫn nếu cần
          },
        });

      } catch (error) {
        console.error("Error processing payment:", error);
      }
    },
  });

  return (
    <div>
      <h2 className="mb-[20px] text-rose-500 font-bold text-[20px]">Price: ${chiTietPhong?.giaTien}</h2>
      <DateRange
        className="w-[100%]"
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      <Form onSubmitCapture={formik.handleSubmit}>
        <div className="flex items-center">
          <p className="font-bold mr-[12px]">Số lượng khách: </p>
          <input type="number" onChange={formik.handleChange} className="border-[1px] border-black p-[12px] rounded-[5px] my-[10px] w-[100px]" name="soLuongKhach" placeholder="1" min={1} max={2} />
        </div>
        {isOverlap && <p className="text-red-500 mb-[20px]">Hết phòng!</p>}
        <Button disabled={isOverlap} htmlType="submit" loading={mutation.isPending} className={buttonClass}>
          Đặt Phòng
        </Button>
      </Form>
    </div>
  );
};
