import { Avatar } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { AiOutlineMenu } from 'react-icons/ai'

export const UserMenu = () => {
  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                airbnb 
            </div>
            <div className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                <AiOutlineMenu />
                <div className='hidden md:block '>
                <Avatar icon={<UserOutlined />} />
                </div>
            </div>
        </div>
    </div>
  )
}
