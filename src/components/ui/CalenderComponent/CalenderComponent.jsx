import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useGetDatPhong } from "../../../hooks/useGetDatPhong";
import moment from "moment";
import { useFormik } from "formik";
import { getUserLogin } from "../../../utils/getUserLogin";
import { usePostDatPhong } from "../../../hooks/usePostDatPhong";
import '../../../assets/style.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PATH } from "../../../constant";

export const CalenderComponent = ({ chiTietPhong, maPhong }) => {
  const navigate = useNavigate()

const { userLogin } = useSelector((state) => state.quanLyNguoiDung)

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

  console.log(chiTietPhong)

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
    ? "w-full bg-gray-400 cursor-not-allowed text-black p-[12px] rounded-[6px]"
    : "w-full bg-rose-500 text-white p-[12px] rounded-[6px]";

  const mutation = usePostDatPhong();

  const formik = useFormik({
    initialValues: {
      id: 0,
      maPhong: maPhong,
      ngayDen: moment(ngayNhanPhong).format("YYYY/MM/DD"), 
      ngayDi: moment(ngayTraPhong).format("YYYY/MM/DD"),  
      soLuongKhach: 0,
      maNguoiDung: userLogin?.id,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      mutation.mutate(values);
      navigate('/payment')
    }
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
    <form onSubmit={formik.handleSubmit}>
      <div className="flex items-center">
      <p className="font-bold mr-[12px]">Số lượng khách: </p>
      <input type="number" onChange={formik.handleChange} className="border-[1px] border-black p-[12px] rounded-[5px] my-[10px] w-[100px]" name="soLuongKhach" min={1} max={2} />
      </div>
      {isOverlap && <p className="text-red-500 mb-[20px]">Hết phòng!</p>}
      <button disabled={isOverlap} type="submit" className={buttonClass}>Đặt Phòng</button>

    </form>
   </div>
  );
};
