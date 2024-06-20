import React, { useEffect } from 'react'
import { HomeCarousel } from '../components/ui/Home/HomeCarousel'
import { HomeTemplate } from '../components/template/HomeTemplate'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../constant'
import { HomeAnyWhere } from '../components/ui/Home/HomeAnyWhere'

export const Home = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung)
  const navigate = useNavigate()
  useEffect(() => {
    if(userLogin) {
      if(userLogin.user.avatar === "") {
        navigate(PATH.user)
      }
    }
  })
  return (
    <div>
        <div className='container mx-auto'>
          <HomeCarousel />
          <HomeAnyWhere />
          <HomeTemplate />
        </div>

    </div>
  )
}
