import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";

export const LikeRoom = () => {
  const { likeCart } = useSelector((state) => state.quanLyPhong);
  console.log(likeCart);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto my-[40px]">
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        Danh sách phòng yêu thích
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-10">
        {likeCart.map((item, i) => {
          let {
            id,
            hinhAnh,
            tenPhong,
            khach,
            phongNgu,
            phongTam,
            giuong,
            giaTien,
          } = item;
          return (
            <section key={i} className="shadow-lg rounded  duration-300">
              <div className="p-3">
                <h2 className=" text-lg font-bold">{tenPhong}</h2>
                <img
                  className="hover:cursor-pointer"
                  onClick={() => {
                    navigate(`${PATH.details}/${id}`);
                  }}
                  src={hinhAnh}
                  alt="mainImage"
                />
                <div className="pt-4 pb-2">
                  <span className="span-gray">{khach} khách</span>
                  <span className="span-gray">{phongNgu} phòng ngủ</span>
                  <span className="span-gray">{giuong} giường</span>
                  <span className="span-gray">{phongTam} phòng tắm</span>
                  <span className="span-gray bg-yellow-300">
                    {giaTien}$/đêm
                  </span>
                  <Link
                    to={`${PATH.details}/${id}`}
                    className="span-gray text-gray-50  bg-red-500"
                  >
                    Chi tiết
                  </Link>
                </div>
                {/* <div className="flex"> {renderComforts(item, "mx-1")}</div> */}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
