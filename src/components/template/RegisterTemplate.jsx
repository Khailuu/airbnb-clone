import { Button, Input, Radio, DatePicker, Space } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { quanLyNguoiDungActionThunks } from "../../store/quanLyNguoiDung";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../constant";
import { IconAirbnb } from "../IconAirbnb";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/register.shcema";
import moment from "moment";

export const RegisterTemplate = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetchingRegister } = useSelector((state) => state.quanLyNguoiDung);

  const onSubmit = (values) => {
    const formattedBirthday = moment(values.birthday).format("DD-MM-YYYY");

    const payload = {
      ...values,
      birthday: formattedBirthday,
      role: "USER", // format date before submitting
    };

    dispatch(quanLyNguoiDungActionThunks.registerThunk(payload))
      .unwrap()
      .then(() => {
        toast.success("Đăng ký thành công!");
        navigate(PATH.login);
      })
      .catch((err) => {
        toast.error(err.response.data.content);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <IconAirbnb className="mx-auto" />
        </div>
        <h1 className="text-[25px]">Register</h1>
        <div className="text-dark mb-[6px] fw-bold">Full Name</div>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              className="!mb-[10px] !border-[1px] !border-black"
              style={{ border: "1px solid #000 !important" }}
              placeholder="Full Name"
            />
          )}
        />
        {!!errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <div className="text-dark mb-[6px] fw-bold">Email</div>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              className="!mb-[10px] !border-[1px] !border-black"
              style={{ border: "1px solid #000 !important" }}
              placeholder="Email"
            />
          )}
          rules={{
            required: "Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
              message: "Invalid email address",
            },
          }}
        />
        {!!errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        <div className="text-dark !mb-[10px] fw-bold">Password</div>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input.Password
              {...field}
              className="!mb-[10px] !border-[1px] !border-black"
              style={{ border: "1px solid #000 !important" }}
              placeholder="Password"
            />
          )}
          rules={{
            required: "Required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
              message:
                "Password must include uppercase, lowercase, number, and special character",
            },
          }}
        />
        {!!errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <div className="text-dark mb-[6px] fw-bold">Phone</div>
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <Input
              {...field}
              className="!mb-[10px] !border-[1px] !border-black"
              style={{ border: "1px solid #000 !important" }}
              placeholder="Phone"
            />
          )}
          rules={{
            required: "Required",
            pattern: {
              value: /^\d{10,11}$/,
              message: "Invalid phone number",
            },
          }}
        />
        {!!errors.phone && (
          <p className="text-red-500">{errors.phone.message}</p>
        )}
        <div className="text-dark mb-[6px] fw-bold">Birthday</div>
        <Controller
          control={control}
          name="birthday"
          render={({ field }) => (
            <DatePicker
              className="mb-[10px]"
              {...field}
              onChange={(date) => {
                console.log(date);
                field.onChange(date);
              }}
            />
          )}
        />
        <div className="text-dark mb-[6px] fw-bold">Gender</div>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Radio.Group
              {...field}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            >
              <Radio value="true">Male</Radio>
              <Radio value="false">Female</Radio>
            </Radio.Group>
          )}
        />
        {/* <div className="text-dark mb-[6px] fw-bold">Role</div> */}
        <Controller
          control={control}
          name="role"
          render={({ field }) => <></>}
        />
        <Button
          className="w-full col-6 mt-[20px]"
          style={{
            backgroundColor: "rgb(244 63 94)",
            border: "none",
            transition: "all .3s",
          }}
          loading={isFetchingRegister}
          htmlType="submit"
          type="primary"
          size="large"
        >
          Register
        </Button>
        <div className="mt-[15px] text-center">
          <NavLink
            className="hover:text-rose-500"
            to={PATH.login}
            style={{ textDecoration: "underline", transition: "all .3s" }}
          >
            Bạn đã có tài khoản ?
          </NavLink>
        </div>
      </form>
    </div>
  );
};
