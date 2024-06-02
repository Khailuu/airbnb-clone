import React from "react";
import { Card } from "antd";
import { useGetPhong } from "../../hooks/api/quanLyPhongApi/useGetPhong";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constant";
const { Meta } = Card;

export const HomeTemplate = () => {
  const navigate = useNavigate()
  const { data: lstPhong } = useGetPhong();


  return (
    <div>
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        Những địa điểm được yêu thích
      </h2>
      <div className="grid gap-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {lstPhong?.map((phong) => (
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
              <Meta title={phong.tenPhong} />
              <p className="my-[10px]">Phòng ngủ: {phong.phongNgu} + số giường {phong.giuong}</p>
              <p className="text-rose-500 font-bold">${phong.giaTien}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
