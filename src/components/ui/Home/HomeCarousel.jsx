import React, { useEffect, useState } from "react";
import { useGetViTriPhanTran } from "../../../hooks/api/quanLyViTriApi/useGetViTriPhanTrang";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tabs } from "antd";
import { useGetPhongTheoMaViTri } from "../../../hooks/api/quanLyPhongApi/useGetPhongTheoViTri";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import { quanLyPhongActions } from "../../../store/quanLyPhong/slice";
import { lstIcon } from "./lstIcon";
import { RenderComforts } from "../../../utils/RenderComforts";
import { useTranslation } from "react-i18next";

export const HomeCarousel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: listViTriPhanTrang, refetch: refetchViTri } =
    useGetViTriPhanTran();
  const [maViTri, setMaViTri] = useState(1);
  const { data: phongByViTri, refetch } = useGetPhongTheoMaViTri(maViTri);
  const dispatch = useDispatch();
  const { likeCart } = useSelector((state) => state.quanLyPhong);
  const [favoriteStatus, setFavoriteStatus] = useState({});

  useEffect(() => {
    if (likeCart) {
      const initialStatus = phongByViTri?.reduce((acc, phong) => {
        acc[phong.id] = likeCart.some((item) => item.id === phong.id);
        return acc;
      }, {});
      setFavoriteStatus(initialStatus || {});
    }
  }, [phongByViTri, likeCart]);

  useEffect(() => {
    refetchViTri();
  }, [maViTri]);
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const passiveSupported = (() => {
      let passive = false;
      try {
        const options = {
          get passive() {
            passive = true;
            return false;
          },
        };
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
      } catch (err) {
        passive = false;
      }
      return passive;
    })();
    const handleWheel = (event) => {};
    window.addEventListener(
      "wheel",
      handleWheel,
      passiveSupported ? { passive: true } : false
    );
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const toggleFavorite = (phong) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [phong.id]: !prevStatus[phong.id],
    }));
    dispatch(quanLyPhongActions.addLikeCart(phong));
  };

  const renderRoomList = () => {
    if (phongByViTri?.length > 0) {
      return phongByViTri?.slice(0, 2).map((phong) => {
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
                <div className="flex">{RenderComforts(phong, "mx-1")}</div>
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
      });
    }
    return <div className="text-[24px] text-rose-500">{t("viTriCapNhat")}</div>;
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 12,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 10,
          slidesToScroll: 10,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          initialSlide: 6,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
    ],
  };

  const tabItems = listViTriPhanTrang?.map((viTri) => ({
    key: viTri.id,
    label: (
      <div className="text-center flex flex-col items-center">
        <img
          className="rounded-full mx-auto"
          src={viTri.hinhAnh}
          style={{ width: 60, minHeight: 60, maxHeight: 60 }}
          alt="hinhAnhViTri"
        />
        <div>
          <p className="text-rose-400 my-3 font-bold">{viTri.tenViTri}</p>
        </div>
      </div>
    ),
    children: (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 my-5 gap-10">
          {renderRoomList()}
        </div>
        {phongByViTri?.length > 0 && (
          <div className="text-center">
            <button
              className="px-4 py-2 w-[100px] bg-rose-500 text-white rounded hover:bg-rose-600 transition-all ease-in-out"
              onClick={() => {
                navigate(`${PATH.roomlist}/${viTri.id}`);
              }}
            >
              {t("xemThem")}
            </button>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="container mx-auto my-[40px]">
      <Slider {...settings} className="mb-[20px]">
        {lstIcon.map((icon, i) => (
          <div className="flex flex-col aligns-center" key={i}>
            <img className="mx-auto !w-[20px] " src={icon.hinhAnh} alt="icon" />
            <p className="text-[12px] text-center mt-[8px]">{t(icon.text)}</p>
          </div>
        ))}
      </Slider>
      <h2 className="text-rose-500 text-[32px] font-bold mb-[30px]">
        {t("diaDiemNoiTieng")}
      </h2>
      <Tabs
        onChange={(key) => {
          setMaViTri(key);
        }}
        items={tabItems}
      />
    </div>
  );
};
