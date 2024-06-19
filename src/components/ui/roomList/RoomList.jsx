import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useGetPhongTheoMaViTri } from "../../../hooks/api/quanLyPhongApi/useGetPhongTheoViTri";
import { useGetViTriTheoId } from "../../../hooks/api/quanLyViTriApi/useGetViTriTheoId";
import { HeartOutlined } from "@ant-design/icons";
import { PATH } from "../../../constant";
import { locationVN } from "./dataLocation";
import { MapRoom } from "./MapRoom";
import { quanLyViTriService } from "../../../services/QuanLyViTriService";

export const RoomList = () => {
  const { id: maViTri } = useParams();
  // const [ viTri, setViTri ] = useState(maViTri)

  const { data: viTriKV, refetch: refetchViTri } = useGetViTriTheoId(maViTri);
  const [currentPosition, setCurrentPosition] = useState(false);

  const {
    data: roomList,
    isLoading,
    isError,
    refetch,
  } = useGetPhongTheoMaViTri(maViTri);

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
            {roomList?.map((viTri) => {
              return (
                <div key={viTri.id} style={{ position: "relative" }}>
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
                        <h2 className="my-[8px] text-[18px]">
                          {viTri?.tenPhong}
                        </h2>
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
                        ${viTri?.giaTien}/{" "}
                        <span className="text-gray-500">Đêm</span>
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
          Vị trí đang được cập nhật...
        </div>
      </div>
    );
  };

  return (
    <div className="my-[40px]">
      <h2 className="text-rose-500 text-[25px] font-bold mb-[30px]">
        Chỗ ở tại khu vực bản đồ đã chọn: {viTriKV?.tenViTri} -{" "}
        {viTriKV?.tinhThanh} - {viTriKV?.quocGia}{" "}
      </h2>
      {renderRoomList()}
    </div>
  );
};
