import React, { useEffect, useState } from "react";
import { useGetPhongTheoMaViTri } from "../../../hooks/api/quanLyPhongApi/useGetPhongTheoViTri";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { RenderComforts } from "../../../utils/RenderComforts";
import { NavLink } from "react-router-dom";
import { PATH } from "../../../constant";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { quanLyPhongActions } from "../../../store/quanLyPhong/slice";

export const Recommend = ({ maViTri, roomId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const { likeCart } = useSelector((state) => state.quanLyPhong);
  const {
    data: roomList,
    isLoading,
    isError,
  } = useGetPhongTheoMaViTri(maViTri);

  useEffect(() => {
    if (likeCart) {
      const initialStatus = roomList?.reduce((acc, phong) => {
        acc[phong.id] = likeCart.some((item) => item.id === phong.id);
        return acc;
      }, {});
      setFavoriteStatus(initialStatus || {});
    }
  }, [roomList, likeCart]);

  const toggleFavorite = (phong) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [phong.id]: !prevStatus[phong.id],
    }));
    dispatch(quanLyPhongActions.addLikeCart(phong));
  };

  const renderRecommend = () => {
    if (isLoading)
      return (
        <div className="text-[24px] text-rose-500">
          <Spin
            className="custom-spin"
            tip="Loading"
            size="large"
            style={{ colorPrimary: "#f43f5e !important" }}
          ></Spin>
        </div>
      );
    if (isError) return <div></div>;

    return roomList?.map((phong) => {
      const {
        id,
        hinhAnh,
        tenPhong,
        khach,
        phongNgu,
        phongTam,
        giuong,
        giaTien,
      } = phong;
      if (phong.id !== roomId) {
        return (
          <div style={{ position: "relative" }} key={phong.id}>
            <div className="p-3">
              <img
                style={{ width: "100%", height: "auto" }}
                className="hover:cursor-pointer rounded-[15px]"
                onClick={() => navigate(`${PATH.details}/${id}`)}
                src={hinhAnh}
                alt="mainImage"
              />
              <div className="p-3">
                <h2 className="font-bold">{t(tenPhong)}</h2>
                <div className="pt-4 pb-2">
                  <span className="span-gray">
                    {khach} {t("khach")}
                  </span>
                  <span className="span-gray">
                    {phongNgu} {t("phongNgu")}
                  </span>
                  <span className="span-gray">
                    {giuong} {t("giuong")}
                  </span>
                  <span className="span-gray">
                    {phongTam} {t("phongTam")}
                  </span>
                  <span className="span-gray bg-yellow-300">
                    {giaTien}$/{t("dem")}
                  </span>
                  <NavLink
                    to={`${PATH.details}/${id}`}
                    className="span-gray text-gray-50 bg-rose-600 hover:text-white"
                  >
                    {t("chiTiet")}
                  </NavLink>
                </div>
                <div className="flex">{RenderComforts(phong, "mx-1")}</div>
              </div>
            </div>
            <div style={{ position: "absolute", top: "8%", right: "5%" }}>
              <button
                aria-label="Icon heart"
                onClick={(e) => {
                  e.stopPropagation();
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
                  <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3C444.801,187.101,434.001,213.101,414.401,232.701z" />
                </svg>
              </button>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div>
      <h2 className="mt-[30px] text-rose-500 text-[25px] font-bold mb-[30px]">
        {t("Suggested rooms in the same location")}
      </h2>
      <div className="grid grid-cols-1 iphone-6:grid-cols-1 lg:grid-cols-2 iphone-6-plus:grid-cols-1 ">
        {renderRecommend()}
      </div>
    </div>
  );
};
