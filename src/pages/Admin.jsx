import React from 'react'
import { AdminTemplate } from '../components/template/AdminTemplate'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../constant'
export const Admin = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung)
  const navigate = useNavigate()
  if(userLogin?.user.role === "USER") {
    navigate(PATH.home)
  }
  
  return (
    <>
      <AdminTemplate />
    </>
  )
}
