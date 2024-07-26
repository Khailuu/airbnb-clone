import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetPhongTheoId } from "../../../hooks/api/quanLyPhongApi/useGetPhongTheoId";
import {
  CopyOutlined,
  FilterOutlined,
  HomeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { RoomComment } from "./RoomComment";
import { CalenderComponent } from "../CalenderComponent/CalenderComponent";
import { RenderComforts } from "../../../utils/RenderComforts";
import { useTranslation } from "react-i18next";

export const RoomDetail = () => {
  const { t } = useTranslation();
  const { id: maPhong } = useParams();

  const { data: chiTietPhong, refetch } = useGetPhongTheoId(maPhong);

  useEffect(() => {
    refetch();
  }, [maPhong]);

  return (
    <div className="container mx-auto my-[40px]">
      <div>
        <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
          {t(chiTietPhong?.tenPhong)}
        </h2>
        <div className="grid grid-cols-3">
          <img
            rel="preload"
            fetchpriority="high"
            src={chiTietPhong?.hinhAnh}
            alt="hinhChiTiet"
            className="col-span-3 w-full rounded-3xl"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 my-[30px] gap-[100px]">
        <div className="col-span-3 xl:col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-3">
          <div className="flex justify-between">
            <div className="content">
              <h3 className="font-bold text-[20px] mb-[12px]">
                {t("Toàn bộ căn hộ condo, chủ nhà Phong")}
              </h3>
              <p>
                {chiTietPhong?.khach} {t("khach")} - {chiTietPhong?.phongNgu}{" "}
                {t("phongNgu")}- {chiTietPhong?.giuong} {t("giuong")} -{" "}
                {chiTietPhong?.phongTam} {t("phongTam")}
              </p>
            </div>
            <div className="logo">
              <img
                className="rounded-full w-[60px]"
                src="https://chiemtaimobile.vn/images/companies/1/Ảnh%20Blog/avatar-facebook-dep/Hinh-dai-dien-hai-huoc-cam-dep-duoi-ai-do.jpg?1704789789335"
                alt="logo"
              />
            </div>
          </div>
          <hr className="mt-[20px]" />
          <div className="description my-[20px]">
            <div className="flex mb-[20px]">
              <HomeOutlined className="size-6 mr-[12px]" />
              <div>
                <h3 className=" font-bold">{t("toanBoNha")}</h3>
                <p className="text-gray-600">
                  {t("Bạn sẽ có chung cư cao cấp cho riêng mình")}
                </p>
              </div>
            </div>
            <div className="flex mb-[20px]">
              <StarOutlined className="size-6 mr-[12px]" />
              <div>
                <h3 className=" font-bold">{t("Vệ sinh tăng cường")}</h3>
                <p className="text-gray-600">
                  {t("Chủ nhà đã cam kết vệ sinh tăng cường 5 bước của AirBnb")}{" "}
                  <b>
                    <a href="">{t("Hiển thị thêm")}</a>
                  </b>{" "}
                </p>
              </div>
            </div>
            <div className="flex mb-[20px]">
              <FilterOutlined className="size-6 mr-[12px]" />
              <div>
                <h3 className=" font-bold">{t("Phong là chủ nhà siêu cấp")}</h3>
                <p className="text-gray-600">
                  {t(
                    "Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết manh lại quãng thời gian tuyệt với cho khách."
                  )}
                </p>
              </div>
            </div>
            <div className="flex mb-[20px]">
              <CopyOutlined className="size-6 mr-[12px]" />
              <div>
                <h3 className=" font-bold">{t("Miễn phí huỷ trong 48h")}</h3>
              </div>
            </div>
          </div>
          <hr className="my-[20px]" />
          <div>
            <h3 className="font-bold text-[20px] mb-[12px]">
              {t("Tiện nghi")}
            </h3>
            <div className="flex my-[30px]">
              {RenderComforts(chiTietPhong, "mx-1")}
            </div>
            <button className="border-black border-solid border-[1px] p-[12px] !w-[180px] rounded-[8px]">
              {t("Hiển thị tất cả 24 tiện nghi")}
            </button>
          </div>
        </div>
        <div className="col-span-3 xl:col-span-1 lg:col-span-1 md:col-span-3 sm:col-span-3">
          <CalenderComponent chiTietPhong={chiTietPhong} maPhong={maPhong} />
        </div>
      </div>
      <hr className="mt-[20px] mb-[30px]" />
      <RoomComment />
    </div>
  );
};
