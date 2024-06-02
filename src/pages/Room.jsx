import React from 'react'
import { RoomList } from '../components/ui/roomList/RoomList'
import { NavBar } from '../components/ui/Navbar/NavBar'

export const Room = () => {
  return (
  <div>
        <div className='container mx-auto'>
          <RoomList />
        </div>
  </div>
  )
}
