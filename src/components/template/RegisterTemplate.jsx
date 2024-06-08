import { Button, Input, Radio, DatePicker, Space } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { quanLyNguoiDungActionThunks } from "../../store/quanLyNguoiDung";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../constant";
import { registerSchema } from "../../schemas/register.shcema";
import { zodResolver } from '@hookform/resolvers/zod'

export const RegisterTemplate = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()



  const onSubmit = (values) => {
    const payload = ({
      ...values,
      birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
      role: "USER" // format date before submitting
    });

    dispatch(quanLyNguoiDungActionThunks.registerThunk(payload)).unwrap().then(() => {
      toast.success("Đăng ký thành công!")
      navigate(PATH.login)
    })
      .catch((err) => {
        toast.error(err)
      })
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
          {
            !!errors.fullName && (
              <p className='text-red-500'>{errors.fullName.message}</p>
            )
          }
        </div>
        <div>

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
            )
            }
          />
          {
            !!errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )
          }
        </div>
        <div>
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
          />
          {
            !!errors.password && (
              <p className='text-red-500'>{errors.password.message}</p>
            )
          }
        </div>
        <div>
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
          />
          {
            !!errors.phone && (
              <p className='text-red-500'>{errors.phone.message}</p>
            )
          }
        </div>
        <div>
          <div className="text-dark mb-[6px] fw-bold">Birthday</div>
          <Controller
            control={control}
            name="birthday"
            render={({ field }) => (
              <DatePicker
                {...field}
                onChange={(date) => {
                  field.onChange(date);
                }}
              />
            )}
          />
    {
            !!errors.birthday && (
              <p className='text-red-500'>{errors.birthday.message}</p>
            )
          }
        </div>
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
        <div className="text-dark mb-[6px] fw-bold">Role</div>
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <></>
          )}
        />
        <Button className="col-6" htmlType="submit" type="primary" size="large">
          Register
        </Button>
      </form>
    </div>
  );
};
