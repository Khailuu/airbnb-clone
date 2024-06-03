import { useUploadHinh } from "../../../hooks/api/quanLyNguoiDungApi/useUploadHinh";
import { useGetDatPhongTheoNguoiDung } from "../../../hooks/api/quanLyDatPhongApi/useGetDatPhongTheoNguoiDung";
import { useGetPhong } from "../../../hooks/api/quanLyPhongApi/useGetPhong";
import { useDeletePhongDaDat } from "../../../hooks/api/quanLyDatPhongApi/useDeletePhongDaDat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { useFormik } from "formik";
// import { useUploadHinh, useDeletePhongDaDat, useGetDatPhongTheoNguoiDung, useGetPhong } from "../../../hooks";
import { NavLink } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Avatar } from "./Avatar";
import { PATH } from "../../../constant";

export const UserComponent = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [imgSrc, setImgSrc] = useState("");

  // const uploadMutation = useUploadHinh();
  const deleteMutation = useDeletePhongDaDat();

  const { data: bookedRooms, refetch } = useGetDatPhongTheoNguoiDung(userLogin?.user.id);
  const { data: allRooms } = useGetPhong();

  // const newData = bookedRooms?.map((bookedRoom) => {
  //   const room = allRooms?.find((room) => room.id === bookedRoom.maPhong);
  //   return { ...bookedRoom, ...room, idDelete: bookedRoom.id };
  // });
  const newData = bookedRooms?.map((selectRoom) => {
    const room = allRooms?.find((item) => item.id === selectRoom.maPhong);
    return room ? { ...selectRoom, ...room, idDelete: selectRoom.id } : selectRoom;
  });

  // useEffect(() => {
  //   alert("Vui lòng cập nhật avatar để hoàn thành xác minh danh tính!")
  // }, [])
  const deleteRoom = (id) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        refetch()
      }
    });
  };
  const renderBookedRooms = () => {
    if (newData?.length > 0) {
      return newData?.map((room, index) => (
        <div key={index} className="flex my-8">
          <img src={room.hinhAnh} alt="Room" className="mr-4 w-48 rounded-lg"/>
          <div>
            <h3 className="text-xl text-rose-500">{room.tenPhong}</h3>
            <p className="text-gray-500">{room?.soLuongKhach} khách</p>
            <hr className="w-[10%] mt-[10px]" />
            <p className="text-gray-500 mt-4 mb-1">Ngày nhận phòng: {room.ngayDen}</p>
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
            <div className="mt-4 flex justify-between items-center">
              <p>Giá tiền: ${room.giaTien}</p>
              <button onClick={() => deleteRoom(room.idDelete)} className="bg-rose-500 text-white p-3 rounded-lg">
                Huỷ Phòng
              </button>
            </div>
          </div>
        </div>
      ));
    }
    if(newData?.length === 0) {
      return <div className="text-rose-500">Hãy quay lại trang chủ để book cho mình 1 phòng xinh đẹp!</div>
    }
  };

  // const handleChangeFile = (e) => {
  //   let file = e.target.files?.[0];
  //   if (file && (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/gif")) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = (e) => {
  //       setImgSrc(e.target?.result);
  //     };
  //     formik.setFieldValue("avatar", file);
  //   }
  // };
  // const formik = useFormik({
  //   initialValues: {
  //     avatar: null
  //   },
  //   onSubmit: (values, { setSubmitting }) => {
  //     const formData = new FormData();
      
  //     if (values.avatar) {
  //       formData.append('avatar', values.avatar, values.avatar.name);
  //     }
  //     console.log(formik.initialValues.avatar)
  //     console.log(formData)
  //     uploadMutation.mutate(formData);
  //     setSubmitting(false);
  //   },
  // });



  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-3 gap-24">
        <div className="border p-4 rounded-lg max-h-[488px]">
          <div className="text-center">
            <Avatar />
            {/* <img src={userLogin?.user.avatar} className="w-36 h-36 object-cover rounded-full mx-auto my-5" alt="avatar"/> */}
            {/* <Button onClick={() => setIsModalOpen(true)}>Chỉnh sửa ảnh</Button>
            <Modal
              title="Upload ảnh"
              open={isModalOpen}
              onOk={() => setIsModalOpen(false)}
              onCancel={() => setIsModalOpen(false)}
            >
              <Avatar />
              <form onSubmit={formik.handleSubmit}>
                <input type="file" accept="image/png, image/jpg, image/jpeg, image/gif" onChange={handleChangeFile}/>
                {imgSrc && <img src={imgSrc} alt="avatar" className="w-48"/>}
                <button type="submit" className="border p-2 rounded-lg mt-5 block w-24">
                  Upload
                </button>
              </form>
            </Modal> */}
          </div>
          <div className="my-10 ml-5">
            <h2 className="mb-5">Xác minh danh tính</h2>
            <button className="border p-2 rounded-lg">Nhận Huy Hiệu</button>
          </div>
          <hr className="mb-10 w-11/12 mx-auto"/>
          <div className="flex items-center mb-10">
            <CheckCircleOutlined style={{ color: "green", fontSize: 30, marginLeft: 20 }}/>
            <p className="ml-2">{userLogin?.user.name}: đã xác minh</p>
          </div>
        </div>
        <div className="col-span-2">
          <h2 className="text-2xl mb-2 text-rose-500 font-bold">Xin chào, tôi là {userLogin?.user.name}</h2>
          <p className="text-gray-500">Bắt đầu tham gia vào 2024</p>
          <div className="my-8">
            <NavLink to={`${PATH.editprofile}/${userLogin?.user.id}`} style={{ textDecoration: "underline" }} className="hover:text-rose-500 transition-all">Chỉnh sửa thông tin</NavLink>
          </div>
          <h2 className="text-2xl">Phòng đã thuê:</h2>
          {renderBookedRooms()}
        </div>
      </div>
    </div>
  );
};
