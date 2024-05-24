import React from 'react'
import { Header } from '../ui/Header'
import { Footer } from '../ui/Footer'
import { Outlet } from 'react-router-dom'

export const HomeLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <Header  className='mt-[100px]' />
        <div className='flex-1'>
          <Outlet />
        </div>
        <Footer />
    </div>
  )
}
