import React from 'react'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../../constant'

export const PaymentComponent = () => {
  return (
    <div className='flex flex-col items-center justify-center my-[40px]'>
      <img className='w-[50%]' src="../../../../public/images/payment-success.jpg" alt="image success" />
      <h2 className='mb-[20px] text-rose-500 text-[40px]'>Đơn hàng của bạn đã được thanh toán thành công!</h2>
      <NavLink to={PATH.home} style={{ textDecoration: "underline" }} className="hover:text-rose-500 transition-all ease-in-out">Quay lại trang chủ</NavLink>
    </div>
  )
}
