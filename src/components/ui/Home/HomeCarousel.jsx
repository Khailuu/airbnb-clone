import React, { useEffect, useState } from "react";
import { useGetViTriPhanTran } from "../../../hooks/useGetViTriPhanTrang";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Tabs } from "antd";
import { useGetPhongTheoMaViTri } from "../../../hooks/useGetPhongTheoViTri";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constant";

const { TabPane } = Tabs;

export const HomeCarousel = () => {
  const navigate = useNavigate()
  const { data: listViTriPhanTrang } = useGetViTriPhanTran();
  const [maViTri, setMaViTri] = useState(1);
  const { data: phongByViTri, refetch } = useGetPhongTheoMaViTri(maViTri);

  useEffect(() => {
    refetch(maViTri);
  }, [maViTri]);

  var settings = {
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

  return (
    <div className="container mx-auto my-[40px]">
      <Slider {...settings} className="mb-[20px]">
        {lstIcon.map((icon, i) => (
          <div className="flex flex-col aligns-center" key={i}>
            <img className="mx-auto !w-[20px]" src={icon.hinhAnh} alt="icon" />
            <p className="text-[12px] text-center mt-[8px]">{icon.text}</p>
          </div>
        ))}
      </Slider>
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        Khám phá những điểm nổi tiếng gần bạn
      </h2>
      <Tabs
        onChange={(key) => {
          setMaViTri(key);
          console.log("key", key)
        }}
      >
        {listViTriPhanTrang?.map((viTri) => (
          <TabPane

            key={viTri.id}
            tab={
              <div
                className="text-center flex flex-col items-center"
                key={viTri.id}
              >
                <img
                  className="rounded-full mx-auto"
                  src={viTri.hinhAnh}
                  style={{ width: 60, minHeight: 60 }}
                  alt="hinhAnhViTri"
                />
                <div>
                  <p className="text-rose-400 my-3 font-bold">
                    {viTri.tenViTri}
                  </p>
                </div>
              </div>
            }
          >
            <div className="grid gap-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {phongByViTri?.map((phong) => {
                return (
                  <div key={phong.id}>
                    <Card
                    onClick={()=>{
                      navigate(`${PATH.details}/${phong.id}`)
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
                      <Meta title={phong.tenPhong}
                      />
                      <p className="my-[10px]">Phòng ngủ: {phong.phongNgu} + số giường {phong.giuong}</p>
                      <p className="text-rose-500 font-bold">${phong.giaTien}</p>
                    </Card>
                  </div>
                );
              })}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};
