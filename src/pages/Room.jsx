import React, { useEffect } from 'react'
import { RoomList } from '../components/ui/roomList/RoomList'

export const Room = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
  <div>
        <div className='container mx-auto'>
          <RoomList />
        </div>
  </div>
  )
}
