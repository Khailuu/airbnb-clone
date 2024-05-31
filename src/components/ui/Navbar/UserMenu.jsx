import { Avatar } from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { AiOutlineMenu } from "react-icons/ai";
import { Button, Popover } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { LOCAL_USER_LOGIN_KEY, PATH } from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import { quanLyNguoiDungAction } from "../../../store/quanLyNguoiDung/slice";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const hide = () => {
  //   setOpen(false);
  // };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const {userLogin} = useSelector((state) => state.quanLyNguoiDung)


  const handleDangXuat = () => {
    localStorage.removeItem(LOCAL_USER_LOGIN_KEY)
    dispatch(quanLyNguoiDungAction.updateUserLogin(null))
    navigate(PATH.login)
  }

  const renderUser = () => {
    if (!userLogin) {
      return (
        <div className="flex flex-col">
          <NavLink to={"/login"}>
            <Button className="mb-[10px] w-full">Đăng Nhập</Button>
          </NavLink>
          <Button>Đăng Ký</Button>
        </div>
      );
    }
    if(userLogin) {
      if(userLogin?.user.role === "USER"){
        return (
          <>
            <div className="flex flex-col">
            <NavLink to={"/userinfo"}>
              <Button className="w-full mb-[15px]">
                Thông tin cá nhân
              </Button>
            </NavLink>
            <Button onClick={() => {
              handleDangXuat()
            }}>Đăng xuất</Button>
            </div>
          </>
        );
      }
      if(userLogin?.user.role === "ADMIN"){
        return (
          <>
          <div className="flex flex-col">
          <NavLink to={PATH.quanlynguoidung}>
              <Button className="w-full mb-[15px]">
                Dành cho admin
              </Button>
            </NavLink>
            <Button onClick={() => {
              handleDangXuat()
            }}>Đăng xuất</Button>
          </div>
          </>
        );
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          airbnb
        </div>
        <Popover
          content={renderUser()}
          title={userLogin?.user.name}
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
            <AiOutlineMenu />
            <div className="hidden md:block">
              <Avatar icon={<UserOutlined />} />
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};
