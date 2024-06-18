import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Avatar } from "./Avatar";
import { PATH } from "../../../constant";
import { useDeletePhongDaDat } from "../../../hooks/api/quanLyDatPhongApi/useDeletePhongDaDat";
import { useGetDatPhongTheoNguoiDung } from "../../../hooks/api/quanLyDatPhongApi/useGetDatPhongTheoNguoiDung";
import { useGetPhong } from "../../../hooks/api/quanLyPhongApi/useGetPhong";

export const UserComponent = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingRoomId, setDeletingRoomId] = useState(null);
  const navigate = useNavigate();
  
  const deleteMutation = useDeletePhongDaDat();

  const { data: bookedRooms, refetch } = useGetDatPhongTheoNguoiDung(userLogin?.user.id);
  const { data: allRooms } = useGetPhong();

  const newData = bookedRooms?.map((selectRoom) => {
    const room = allRooms?.find((item) => item.id === selectRoom.maPhong);
    return room ? { ...selectRoom, ...room, idDelete: selectRoom.id } : selectRoom;
  });

  const deleteRoom = (id) => {
    setDeletingRoomId(id);  // Set the room ID being deleted
    deleteMutation.mutate(id, {
      onSuccess: () => {
        refetch();
        setDeletingRoomId(null);  // Reset the deleting room ID after success
      },
      onError: () => {
        setDeletingRoomId(null);  // Reset the deleting room ID on error
      }
    });
  };

  const renderBookedRooms = () => {
    if (newData?.length > 0) {
      return newData.map((room, index) => (
        <div key={index} className="flex my-8">
          <img
            src={room.hinhAnh}
            alt="Room"
            className="mr-4 w-48 rounded-lg flex-none"
          />
          <div className="flex-grow">
            <h3 className="text-xl text-rose-500 cursor-pointer" onClick={() => {
              navigate(`${PATH.details}/${room?.id}`);
            }}>{room.tenPhong}</h3>
            <p className="text-gray-500">{room?.soLuongKhach} khách</p>
            <hr className="w-[10%] mt-[10px]" />
            <p className="text-gray-500 mt-4 mb-1">
              Ngày nhận phòng: {room.ngayDen}
            </p>
            <p className="text-gray-500">Ngày trả phòng: {room.ngayDi}</p>
            <hr className="w-[100%] mt-[10px]" />
            <p className="mt-[10px] text-[14px] text-gray-500">
              {room?.mayGiat ? "Máy giặt " : ""}
              {room?.bep ? "- Bếp " : ""}
              {room?.dieuHoa ? "- Điều hoà " : ""}
              {room?.doXe ? "- Bãi đỗ xe " : ""}
              {room?.hoBoi ? "- Hồ bơi " : ""}
              {room?.tivi ? "- Tivi " : ""}
              {room?.wifi ? "- Wifi " : ""}
              {room?.banLa ? "- Bàn là " : ""}
              {room?.banUi ? "- Bàn ủi " : ""}
            </p>
            <div className="mt-4 flex justify-between items-center w-full">
              <p>Giá tiền: ${room.giaTien}</p>
              <Button
                loading={deletingRoomId === room.idDelete} 
                onClick={() => deleteRoom(room.idDelete || room.id)}
                className="bg-rose-500 text-white !hover:bg-rose-900 rounded-lg"
              >
                Huỷ Phòng
              </Button>
            </div>
          </div>
        </div>
      ));
    }
    if (newData?.length === 0) {
      return (
        <div className="text-rose-500">
          Lịch sử đặt phòng trống!
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-3 gap-[30px]">
        <div className="border p-4 rounded-lg max-h-[450px] xs:col-span-3 xl-col-span-1 md:col-span-1 lg:col-span-1 sm:col-span-3 col-span-3">
          <div className="flex lg:block xl:block md:block items-center">
            <div className="text-center">
              <Avatar />
            </div>
            <div className="md:mt-[10px] lg:mt-[10px] xl:mt-[10px]">
              <div className="ml-5">
                <h2 className="">Xác minh danh tính</h2>
                <button className="my-[20px] border p-2 rounded-lg">Nhận Huy Hiệu</button>
              </div>
              <hr className="ml-5 mb-[15px] w-[]"/>
              <div className="flex items-center md:mb-10 lg:mb-10 xl:mb-10">
                <CheckCircleOutlined
                  style={{ color: "green", fontSize: 30, marginLeft: 20 }}
                />
                <p className="ml-2">{userLogin?.user.name}: đã xác minh</p>
              </div>
            </div>
          </div>
        </div>
        <div className="xs:col-span-3 xl-col-span-2 md:col-span-2 lg:col-span-2 sm:col-span-3 col-span-3">
          <h2 className="text-2xl mb-2 text-rose-500 font-bold">
            Xin chào, {userLogin?.user.name}
          </h2>
          <p className="text-gray-500">Bắt đầu tham gia vào 2024</p>
          <div className="my-8">
            <NavLink
              to={`${PATH.editprofile}/${userLogin?.user.id}`}
              style={{ textDecoration: "underline" }}
              className="hover:text-rose-500 transition-all"
            >
              Chỉnh sửa thông tin
            </NavLink>
          </div>
          <h2 className="text-2xl">Phòng đã thuê:</h2>
          {renderBookedRooms()}
        </div>
      </div>
    </div>
  );
};
