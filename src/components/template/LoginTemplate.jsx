import { Button, Input } from 'antd'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../schemas/login.schema'
import { quanLyNguoiDungActionThunks } from '../../store/quanLyNguoiDung'
import { toast } from 'react-toastify'
import { PATH } from '../../constant'


export const LoginTemplate = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {control , handleSubmit, formState: { errors }} = useForm({
    resolver: zodResolver(loginSchema)
  })
  const { isFetchingLogin, userLogin } = useSelector((state) => state.quanLyNguoiDung)
  const role = userLogin?.user.role

  const onSubmit = (values) => {
    dispatch(quanLyNguoiDungActionThunks.loginThunk(values)).unwrap().then(() => {
      toast.success("Login Success!")
      if(role === "ADMIN") {
        navigate(PATH.quanlynguoidung)
      }
      if(role === "USER") {
        navigate(PATH.home)
      }
    })
  }

  if(userLogin) {
    if(role === "ADMIN"){
      return <Navigate to={PATH.quanlynguoidung}/>
    } else if (role === "USER"){
      return <Navigate to='/'/>
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <div className='mt-[20px]'>
        <p>User Name</p>
        <Controller 
          control={control}
          name='email'
          render={({ field }) => <Input {...field} />}
        />
        {
          !!errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )
        }
      </div>
      <div className='mt-[20px]'>
        <p>Password</p>
        <Controller 
          control={control}
          name="password"
          render={({ field }) => <Input.Password {...field}/>}
        />
         {
          !!errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )
        }
      </div>
      <div className="text-center mt-20">
                <Button loading={isFetchingLogin} htmlType="submit" style={{ backgroundColor: "#72be43", border: "none" }} size='large' className='!text-white w-[100%]'>
                    Đăng Nhập
                </Button>
            </div>
    </form>
  )
}
