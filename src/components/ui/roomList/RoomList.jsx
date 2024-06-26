import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetPhongTheoMaViTri } from "../../../hooks/api/quanLyPhongApi/useGetPhongTheoViTri";
import { useGetViTriTheoId } from "../../../hooks/api/quanLyViTriApi/useGetViTriTheoId";
import { PATH } from "../../../constant";
import { locationVN } from "./dataLocation";
import { MapRoom } from "./MapRoom";
import { quanLyViTriService } from "../../../services/QuanLyViTriService";
import { quanLyPhongActions } from "../../../store/quanLyPhong/slice";
import { useDispatch, useSelector } from "react-redux";
import { RenderComforts } from "../../../utils/RenderComforts";
import { useTranslation } from "react-i18next";


export const RoomList = () => {
  const { t } = useTranslation()
  const { id: maViTri } = useParams();
  const { likeCart } = useSelector((state) => state.quanLyPhong);
  const { data: viTriKV, refetch: refetchViTri } = useGetViTriTheoId(maViTri);
  const [currentPosition, setCurrentPosition] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState({});
  const dispatch = useDispatch();

  const {
    data: roomList,
    isLoading,
    isError,
    refetch,
  } = useGetPhongTheoMaViTri(maViTri);

  const toggleFavorite = (phong) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [phong.id]: !prevStatus[phong.id],
    }));
    dispatch(quanLyPhongActions.addLikeCart(phong));
  };

  useEffect(() => {
    if (likeCart) {
      const initialStatus = roomList?.reduce((acc, phong) => {
        acc[phong.id] = likeCart.some((item) => item.id === phong.id);
        return acc;
      }, {});
      setFavoriteStatus(initialStatus || {});
    }
  }, [roomList, likeCart]);

  useEffect(() => {
    quanLyViTriService.getViTriTheoId(maViTri).then((res) => {
      let { tinhThanh } = res.data.content;
      let index = locationVN.findIndex(
        (item) => item.admin_name === tinhThanh || item.city === tinhThanh
      );
      setCurrentPosition({
        ...res.data.content,
        center: {
          lat: +locationVN[index]?.lat,
          lng: +locationVN[index]?.lng,
        },
      });
    });
  }, [maViTri]);

  useEffect(() => {
    refetchViTri(maViTri);
    refetch(maViTri);
  }, [maViTri]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const renderRoomList = () => {
    if (roomList.length > 0) {
      return (
        <div className="grid grid-cols-5 gap-[30px]">
          <div className="xl:col-span-3 lg:col-span-3 col-span-5">
            {roomList?.map((phong) => {
              let {
                id,
                hinhAnh,
                tenPhong,
                khach,
                phongNgu,
                phongTam,
                giuong,
                giaTien,
              } = phong;
              return (
                <div style={{ position: "relative" }} key={phong.id}>
                  <div className="p-3">
                    <img
                      style={{ width: "100%", height: "auto" }}
                      className="hover:cursor-pointer rounded-[15px]"
                      onClick={() => {
                        navigate(`${PATH.details}/${id}`);
                      }}
                      src={hinhAnh}
                      alt="mainImage"
                    />
                    <div className="p-3">
                      <h2 className="font-bold">{tenPhong}</h2>
                      <div className="pt-4 pb-2">
                        <span className="span-gray">{khach} {t("khách")}</span>
                        <span className="span-gray">{phongNgu} {t("phongNgu")}</span>
                        <span className="span-gray">{giuong} {t("giuong")}</span>
                        <span className="span-gray">{phongTam} {t("phongTam")}</span>
                        <span className="span-gray bg-yellow-300  ">
                          {giaTien}$/{t("dem")}
                        </span>
                        <NavLink
                          to={`${PATH.details}/${id}`}
                          className="span-gray text-gray-50 bg-rose-500 hover:text-white"
                        >
                          {t("chiTiet")}
                        </NavLink>
                      </div>
                      <div className="flex">
                        {RenderComforts(phong, "mx-1")}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "8%",
                      right: "5%",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click event
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
            })}
          </div>
          <div className="lg:col-span-2 xl:col-span-2 col-span-5">
            {currentPosition && (
              <MapRoom roomList={roomList} currentPosition={currentPosition} />
            )}
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <img
          src="../../../../images/work.png"
          alt="logo"
          className="w-[500px]"
        />
        <div className="text-[30px] text-rose-500">
          {t("Vị trí đang được cập nhật")}...
        </div>
      </div>
    );
  };

  return (
    <div className="my-[40px]">
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        {t("Chỗ ở tại khu vực bản đồ đã chọn")}: {viTriKV?.tenViTri} -{" "}
        {viTriKV?.tinhThanh} - {viTriKV?.quocGia}{" "}
      </h2>
      {renderRoomList()}
    </div>
  );
};
