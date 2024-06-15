import { Button, Input } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas/login.schema";
import { quanLyNguoiDungActionThunks } from "../../store/quanLyNguoiDung";
import { toast } from "react-toastify";
import { PATH } from "../../constant";
import { IconAirbnb } from "../IconAirbnb";

export const LoginTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { isFetchingLogin, userLogin } = useSelector(
    (state) => state.quanLyNguoiDung
  );
  const role = userLogin?.user.role;

  const onSubmit = (values) => {
    dispatch(quanLyNguoiDungActionThunks.loginThunk(values))
      .unwrap()
      .then(() => {
        toast.success("Login Success!");
        if (role === "ADMIN") {
          navigate(PATH.quanlynguoidung);
        }
        if (role === "USER") {
          navigate(PATH.home);
        }
      })
      .catch((err) => {
        console.log(err?.response?.data?.content);
        toast.error(err?.response?.data?.content);
      });
  };

  if (userLogin) {
    if (role === "ADMIN") {
      return <Navigate to={PATH.quanlynguoidung} />;
    } else if (role === "USER") {
      return <Navigate to="/" />;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center">
        <IconAirbnb className="mx-auto" />
      </div>
      <h1 className="text-[25px]">Login</h1>
      <div className="mt-[20px]">
        <p className="mb-[8px]">User Name</p>
        <Controller
          control={control}
          name="email"
          render={({ field }) => <Input {...field} />}
        />
        {!!errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="mt-[20px]">
        <p className="mb-[8px]">Password</p>
        <Controller
          control={control}
          name="password"
          render={({ field }) => <Input.Password {...field} />}
        />
        {!!errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="text-center mt-[20px]">
        <Button
          loading={isFetchingLogin}
          htmlType="submit"
          style={{ backgroundColor: "rgb(244 63 94)", border: "none", transition: "all .3s" }}
          size="large"
          className="!text-white w-[100%] !hover:bg-rose-700"
        >
          Đăng Nhập
        </Button>
      </div>
      <div className="mt-[15px] text-center">
        <NavLink className="hover:text-rose-500" to={PATH.register} style={{ textDecoration: "underline", transition: "all .3s" }}>Bạn chưa có tài khoản ?</NavLink>
      </div>
    </form>
  );
};
