import React from 'react'
import Header from '../components/Header'
import Home from '../pages/Home'

const DefaultLayout = () => {
  return (
    <div className='h-[100vh] w-full'>
        <Header />
        <Home />
    </div>
  )
}

export default DefaultLayout