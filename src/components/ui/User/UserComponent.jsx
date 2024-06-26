import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { useNavigate, NavLink } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Avatar } from "./Avatar";
import { PATH } from "../../../constant";
import { useDeletePhongDaDat } from "../../../hooks/api/quanLyDatPhongApi/useDeletePhongDaDat";
import { useGetDatPhongTheoNguoiDung } from "../../../hooks/api/quanLyDatPhongApi/useGetDatPhongTheoNguoiDung";
import { useGetPhong } from "../../../hooks/api/quanLyPhongApi/useGetPhong";
import { CloseIcon } from "../../../utils/IconSVG";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { RenderComforts } from "../../../utils/RenderComforts";
import { message, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
const confirm = (e) => {
  console.log(e);
  message.success("Click on Yes");
};

export const UserComponent = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);
  const [deletingRoomId, setDeletingRoomId] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation()

  const deleteMutation = useDeletePhongDaDat();

  const { data: bookedRooms, refetch } = useGetDatPhongTheoNguoiDung(
    userLogin?.user.id
  );
  const { data: allRooms } = useGetPhong();

  const newData = bookedRooms?.map((selectRoom) => {
    const room = allRooms?.find((item) => item.id === selectRoom.maPhong);
    return room
      ? { ...selectRoom, ...room, idDelete: selectRoom.id }
      : selectRoom;
  });

  useEffect(() => {
    if (userLogin?.user.avatar === "") {
      toast.error("Vui lòng cập nhật avatar để xác thực tài khoản");
    }
  }, []);

  const deleteRoom = (id) => {
    setDeletingRoomId(id);
    deleteMutation.mutate(id, {
      onSuccess: () => {
        refetch();
        setDeletingRoomId(null);
      },
      onError: () => {
        setDeletingRoomId(null);
      },
    });
  };

  const renderBookedRooms = () => {
    if (newData?.length > 0) {
      return newData.map((room, index) => (
        <div key={index} className="flex my-8 flex-col lg:flex-row ">
          <img
            src={room.hinhAnh}
            alt="Room"
            className="mr-4 lg:w-48 rounded-lg w-full flex-none"
          />
          <div className="flex-grow">
            <h3
              className="text-xl text-rose-500 cursor-pointer"
              onClick={() => {
                navigate(`${PATH.details}/${room?.id}`);
              }}
            >
              {t(room.tenPhong)}
            </h3>
            <p className="text-gray-500">{room?.soLuongKhach} {t("khach")}</p>
            <hr className="w-[10%] mt-[10px]" />
            <p className="text-gray-500 mt-4 mb-1">
              {t("Ngày nhận phòng")}: {room.ngayDen}
            </p>
            <p className="text-gray-500">{t("Ngày trả phòng")}: {room.ngayDi}</p>
            <hr className="w-[100%] mt-[10px]" />
            <div className="flex mt-[10px]">{RenderComforts(room, "mx-1")}</div>
            <div className="mt-4 flex justify-between items-center w-full">
              <p>{t("Giá tiền")}: ${room.giaTien}</p>
              <Popconfirm
                description="Bạn có chắc chắn muốn huỷ phòng?"
                onConfirm={() => {
                  deleteRoom(room.idDelete || room.id);
                }}
                okText="Đồng ý"
                cancelText="Huỷ bỏ"
              >
                <Button
                  loading={deletingRoomId === room.idDelete}
                  className="bg-rose-500 text-white !hover:bg-rose-900 rounded-lg"
                >
                  {t("Huỷ Phòng")}
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      ));
    }
    if (newData?.length === 0) {
      return <div className="text-rose-500">{t("Lịch sử đặt phòng trống!")}</div>;
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-3 gap-[30px]">
        <div className="border p-4 rounded-lg max-h-[450px] xs:col-span-3 xl-col-span-1 md:col-span-3 lg:col-span-1 sm:col-span-3 col-span-3">
          <div className="flex lg:block xl:block md:block items-center">
            <div className="text-center">
              <Avatar />
            </div>
            <div className="md:mt-[10px] lg:mt-[10px] xl:mt-[10px]">
              <div className="ml-5">
                <h2 className="">{t("Xác minh danh tính")}</h2>
                <button className="my-[20px] border p-2 rounded-lg">
                  {t("Nhận Huy Hiệu")}
                </button>
              </div>
              <hr className="ml-5 mb-[15px] w-[]" />
              <div className="flex items-center md:mb-10 lg:mb-10 xl:mb-10">
                <CheckCircleOutlined
                  style={{ color: "green", fontSize: 30, marginLeft: 20 }}
                />
                <p className="ml-2">{userLogin?.user.name}: {t("Đã xác minh")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="xs:col-span-3 xl-col-span-2 md:col-span-3 lg:col-span-2 sm:col-span-3 col-span-3">
          <h2 className="text-2xl mb-2 text-rose-500 font-bold">
            {t("Xin chào")}, {userLogin?.user.name}
          </h2>
          <p className="text-gray-500">{t("Bắt đầu tham gia vào 2024")}</p>
          <div className="my-8">
            <NavLink
              to={`${PATH.editprofile}/${userLogin?.user.id}`}
              style={{ textDecoration: "underline" }}
              className="hover:text-rose-500 transition-all"
            >
              {t("Chỉnh sửa thông tin")}
            </NavLink>
          </div>
          <h2 className="text-2xl">{t("Phòng đã thuê")}:</h2>
          {renderBookedRooms()}
        </div>
      </div>
    </div>
  );
};
