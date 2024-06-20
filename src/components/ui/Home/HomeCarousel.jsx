import React, { useEffect, useState } from "react";
import { useGetViTriPhanTran } from "../../../hooks/api/quanLyViTriApi/useGetViTriPhanTrang";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Tabs } from "antd";
import { useGetPhongTheoMaViTri } from "../../../hooks/api/quanLyPhongApi/useGetPhongTheoViTri";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";
import HeartIcon from "../../HeartIcon";
import { useDispatch, useSelector } from "react-redux";
import { quanLyPhongActions } from "../../../store/quanLyPhong/slice";

export const HomeCarousel = () => {
  const navigate = useNavigate();
  const { data: listViTriPhanTrang, refetch: refetchViTri } =
    useGetViTriPhanTran();
  const [maViTri, setMaViTri] = useState(1);
  const { data: phongByViTri, refetch } = useGetPhongTheoMaViTri(maViTri);

  const dispatch = useDispatch();

  const { likeCart } = useSelector((state) => state.quanLyPhong);

  const [favoriteStatus, setFavoriteStatus] = useState({});

  useEffect(() => {
    // Initialize favoriteStatus based on likeCart
    if(likeCart) {
      const initialStatus = phongByViTri?.reduce((acc, phong) => {
        acc[phong.id] = likeCart.some((item) => item.id === phong.id);
        return acc;
      }, {});
      setFavoriteStatus(initialStatus || {});
    }
  }, [phongByViTri, likeCart]);

  useEffect(() => {
    refetch();
  }, [maViTri]);

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
    const handleWheel = (event) => {
      // Your wheel event handling logic here
    };
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

  const lstIcon = [
    {
      hinhAnh:
        "https://a0.muscache.com/im/pictures/mediaverse/category_icon/original/3e5243c8-4d15-4c6b-97e3-7ba2bb7bb880.png",
      text: "Biểu Tượng",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
      text: "Hồ Bơi",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
      text: "Phòng",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
      text: "Khung Cảnh",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/5ed8f7c7-2e1f-43a8-9a39-4edfc81a3325.jpg",
      text: "Phục Vụ Bữa Sáng",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
      text: "Hướng Biển",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
      text: "Nông Thôn",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
      text: "Thật Ấn Tượng",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
      text: "Cabin",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
      text: "Ven Hồ",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
      text: "Lâu Đài",
    },
    {
      hinhAnh:
        "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
      text: "Nhà Nhỏ",
    },
  ];

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
      <div className="grid gap-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {phongByViTri?.map((phong) => (
          <div key={phong.id} style={{ position: "relative" }}>
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
        ))}
      </div>
    ),
  }));

  return (
    <div className="container mx-auto my-[40px]">
      <Slider {...settings} className="mb-[20px]">
        {lstIcon.map((icon, i) => (
          <div className="flex flex-col aligns-center" key={i}>
            <img className="mx-auto !w-[20px] " src={icon.hinhAnh} alt="icon" />
            <p className="text-[12px] text-center mt-[8px]">{icon.text}</p>
          </div>
        ))}
      </Slider>
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        Khám phá những điểm nổi tiếng
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
