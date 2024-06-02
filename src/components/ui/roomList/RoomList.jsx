import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetPhongTheoMaViTri } from "../../../hooks/api/quanLyPhongApi/useGetPhongTheoViTri";
import { useGetViTriTheoId } from "../../../hooks/api/quanLyViTriApi/useGetViTriTheoId";
import { HeartOutlined } from "@ant-design/icons";
import { PATH } from "../../../constant";

export const RoomList = () => {
  const { id: maViTri } = useParams();
  // const [ viTri, setViTri ] = useState(maViTri)

  const { data: viTriKV, refetch: refetchViTri } = useGetViTriTheoId(maViTri);

  const {
    data: roomList,
    isLoading,
    isError,
    refetch,
  } = useGetPhongTheoMaViTri(maViTri);

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

  return (
    <div className="my-[40px]">
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        Chỗ ở tại khu vực bản đồ đã chọn: {viTriKV?.tenViTri} -{" "}
        {viTriKV?.tinhThanh} - {viTriKV?.quocGia}{" "}
      </h2>
      <div className="grid grid-cols-5 gap-[30px]">
        <div className="col-span-3">
          {roomList?.map((viTri) => {
            return (
              <div style={{ position: "relative" }}>
                <hr />
                <div
                  className="grid grid-cols-12 my-[30px] gap-[30px]"
                  key={viTri.id}
                >
                  <img
                    className="col-span-4 rounded-[10px]"
                    src={viTri.hinhAnh}
                    alt="hinhAnhPhong"
                    style={{ minHeight: "100%" }}
                  />
                  <div className="col-span-8">
                    <p className="text-gray-500">
                      Toàn bộ căn hộ dịch vụ tại: {viTriKV?.tenViTri}
                    </p>
                    <NavLink to={`${PATH.details}/${viTri?.id}`}>
                    <h2 className="my-[8px] text-[18px]">{viTri?.tenPhong}</h2>
                    </NavLink>
                    <hr className="w-[5%]" />
                    <p className="mt-[15px] text-[14px] text-gray-500">
                      {viTri?.khach} khách - {viTri?.phongNgu} phòng ngủ -{" "}
                      {viTri?.giuong} giường - {viTri?.phongTam} phòng tắm
                    </p>
                    <p className="mt-[10px] text-[14px] text-gray-500">
                      {viTri?.mayGiat ? "Máy giặt " : ""}
                      {viTri?.bep ? "- Bếp " : ""}
                      {viTri?.dieuHoa ? "- Điều hoà " : ""}
                      {viTri?.doXe ? "- Bãi đỗ xe " : ""}
                      {viTri?.hoBoi ? "- Hồ bơi " : ""}
                      {viTri?.tivi ? "- Tivi " : ""}
                      {viTri?.wifi ? "- Wifi " : ""}
                      {viTri?.banLa ? "- Bàn là " : ""}
                      {viTri?.banUi ? "- Bàn ủi " : ""}
                    </p>
                    <div className="text-right text-[25px]">
                      ${viTri?.giaTien}/ <span className="text-gray-500">Đêm</span>
                    </div>
                  </div>
                </div>
                <HeartOutlined
                  style={{ position: "absolute", top: "10%", right: "1%" }}
                  className="text-[25px] text-gray-900 "
                />
              </div>
            );
          })}
        </div>
        <div className="col-span-2">
          <iframe
            className="rounded-[12px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.765283079985!2d106.67776297585065!3d10.77521852898983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1717346736604!5m2!1svi!2s"
            style={{ border: 0, minHeight: "100%", minWidth: "100%" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
};
