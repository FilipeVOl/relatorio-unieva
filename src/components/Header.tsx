import React from 'react'
import Logo from '../assets/UniLogo.png'

const Header = () => {
  return (
    <div className='bg-[#1F2B50] w-full h-[10%] flex items-center pl-[50px]'>
      <img src={Logo} alt='unievangelica logo' className='h-14' />
    </div>
  )
}

export default Header