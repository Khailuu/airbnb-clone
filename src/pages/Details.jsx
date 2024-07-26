import React, { useEffect } from 'react'
import { RoomDetail } from '../components/ui/Detail/RoomDetail'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export const Details = () => {
  const { userLogin } = useSelector((state) => state.quanLyNguoiDung)
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if(!userLogin) {  
      navigate('/login')
    }
  },[userLogin])
  return (
    <RoomDetail />
  )
}
