import React from 'react'
import { NavBar } from '../components/ui/Navbar/NavBar'
import { HomeCarousel } from '../components/ui/Home/HomeCarousel'
import { HomeTemplate } from '../components/template/HomeTemplate'

export const Home = () => {
  return (
    <div>
        <div className='container mx-auto'>
          <HomeCarousel />
          <HomeTemplate />
        </div>

    </div>
  )
}
