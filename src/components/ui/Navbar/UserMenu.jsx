import { Popconfirm } from "antd";
import React, { useState } from "react";
import { GlobalOutlined, UserOutlined } from "@ant-design/icons";
import { AiOutlineMenu } from "react-icons/ai";
import { Button, Popover } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { LOCAL_LIKE_CART, LOCAL_USER_LOGIN_KEY, PATH } from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import { quanLyNguoiDungAction } from "../../../store/quanLyNguoiDung/slice";
import { quanLyPhongActions } from "../../../store/quanLyPhong/slice";
import { useTranslation } from "react-i18next";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const confirm = () => {
    dispatch(quanLyPhongActions.deleteCart([]));
    handleDangXuat();
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung);

  const handleDangXuat = () => {
    localStorage.removeItem(LOCAL_USER_LOGIN_KEY);
    localStorage.removeItem(LOCAL_LIKE_CART);
    dispatch(quanLyNguoiDungAction.updateUserLogin(null));
    dispatch(quanLyPhongActions.deleteCart([]));
    navigate(PATH.login);
  };

  const renderAvatar = () => {
    if (userLogin?.user?.avatar !== "") {
      return (
        <img
          src={userLogin?.user?.avatar}
          className="w-[32px] h-[32px] rounded-full"
          alt=""
        />
      );
    }
    return <UserOutlined />;
  };

  const renderUser = () => {
    if (!userLogin) {
      return (
        <div className="flex flex-col">
          <NavLink to={"/login"}>
            <Button className="mb-[10px] w-full">{t("login")}</Button>
          </NavLink>
          <NavLink to={"/register"}>
            <Button>{t("register")}</Button>
          </NavLink>
        </div>
      );
    }
    if (userLogin) {
      if (userLogin?.user?.role === "USER") {
        return (
          <>
            <div className="flex flex-col">
              <NavLink to={"/userinfo"}>
                <Button className="w-full mb-[15px]">
                  {t("personal_info")}
                </Button>
              </NavLink>
              <NavLink to={PATH.likeroom}>
                <Button className="w-full mb-[15px]">
                  {t("favorite_rooms")}
                </Button>
              </NavLink>
              <Popconfirm
                description="Khi đăng xuất dữ liệu phòng yêu thích sẽ bị xoá!"
                onConfirm={() => {
                  confirm();
                }}
                okText={t("Đồng ý")}
                cancelText={t("Huỷ bỏ")}
              >
                <Button className="w-full">{t("logout")}</Button>
              </Popconfirm>
            </div>
          </>
        );
      }
      if (userLogin?.user?.role === "ADMIN") {
        return (
          <>
            <div className="flex flex-col">
              <NavLink to={"/userinfo"}>
                <Button className="w-full mb-[15px]">
                  {t("personal_info")}
                </Button>
              </NavLink>
              <NavLink to={PATH.likeroom}>
                <Button className="w-full mb-[15px]">
                  {t("favorite_rooms")}
                </Button>
              </NavLink>
              <NavLink to={PATH.quanlynguoidung}>
                <Button className="w-full mb-[15px]">{t("admin")}</Button>
              </NavLink>
              <Popconfirm
                description={t(
                  "Khi đăng xuất dữ liệu phòng yêu thích sẽ bị xoá!"
                )}
                onConfirm={() => {
                  confirm();
                }}
                okText={t("Đồng ý")}
                cancelText={t("Huỷ bỏ")}
              >
                <Button className="w-full">{t("logout")}</Button>
              </Popconfirm>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-1">
        <div className="text-gray-500 hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          {t("become_host")} <GlobalOutlined />
        </div>
        <Popover
          content={renderUser()}
          title={userLogin?.user?.name}
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
            <AiOutlineMenu />
            <div className="hidden md:block">{renderAvatar()}</div>
          </div>
        </Popover>
      </div>
    </div>
  );
};
