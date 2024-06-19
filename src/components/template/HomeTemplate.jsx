import React, { useState } from "react";
import { Card } from "antd";
import { useGetPhong } from "../../hooks/api/quanLyPhongApi/useGetPhong";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { quanLyPhongActions } from "../../store/quanLyPhong/slice";
const { Meta } = Card;

export const HomeTemplate = () => {
  const navigate = useNavigate();
  const { data: lstPhong } = useGetPhong();
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const dispatch = useDispatch();
  const { likeCart } = useSelector((state) => state.quanLyPhong);
  console.log(likeCart);

  const toggleFavorite = (phong) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [phong.id]: !prevStatus[phong.id],
    }));
    dispatch(quanLyPhongActions.addLikeCart(phong));
  };

  return (
    <div className="mb-[40px]">
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        Những địa điểm được yêu thích
      </h2>
      <div className="grid gap-[30px] grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {lstPhong?.map((phong) => (
          <div style={{ position: "relative" }} key={phong.id}>
            <Card
              onClick={() => {
                navigate(`${PATH.details}/${phong.id}`);
              }}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  style={{ height: 240, width: 480 }}
                  alt="example"
                  src={phong.hinhAnh}
                />
              }
            >
              <Meta title={phong.tenPhong} />
              <p className="my-[10px]">
                Phòng ngủ: {phong.phongNgu} + số giường {phong.giuong}
              </p>
              <p className="text-rose-500 font-bold">${phong.giaTien}</p>
            </Card>
            <div
              style={{
                position: "absolute",
                top: "5%",
                right: "2%",
              }}
            >
              <button
                onClick={() => {
                  toggleFavorite(phong);
                }}
                className={`w-10 h-10 flex items-center justify-center rounded-full border-1 transition-background duration-300 ${
                  favoriteStatus[phong.id]
                    ? "bg-rose-500 border-white"
                    : "border-gray-500 bg-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={favoriteStatus[phong.id] ? "white" : "none"}
                  stroke="currentColor"
                  strokeWidth="1"
                  height="24px"
                  width="24px"
                  viewBox="0 0 471.701 471.701"
                >
                  <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1   c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3   l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4   C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3   s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4   c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3   C444.801,187.101,434.001,213.101,414.401,232.701z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
