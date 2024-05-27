import { Avatar } from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { AiOutlineMenu } from "react-icons/ai";
import { Button, Popover } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserLogin } from "../../../utils/getUserLogin";
import { LOCAL_USER_LOGIN_KEY } from "../../../constant";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const userLogin = localStorage.getItem(LOCAL_USER_LOGIN_KEY)

  console.log(userLogin)

  const handleDangXuat = () => {
    localStorage.removeItem(LOCAL_USER_LOGIN_KEY)
    navigate('/login')
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
    return (
      <>
        <NavLink to={"/login"}>
          <Button>
            Thông tin cá nhân
          </Button>
        </NavLink>
        <Button onClick={() => {
          handleDangXuat()
        }}>Đăng xuất</Button>
      </>
    );
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          airbnb
        </div>
        <Popover
          content={renderUser()}
          title="Title"
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
