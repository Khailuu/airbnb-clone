import React from 'react'
import { RoomList } from '../components/ui/Content/RoomList'
import { NavBar } from '../components/ui/Navbar/NavBar'

export const Room = () => {
  return (
  <div>
        <div className='container mt-[40px] min-w-[1240px] ms-auto'>
          <RoomList />
        </div>
  </div>
  )
}
