import React from 'react'
import TextInput from './textinput';
import ParkiezLogo from '../assets/parkiez_logo.png'
import CustomBtn from './button'

const Operatorlogin = () => {
  return (
    <>
      <div className='bg-green-300 w-full h-screen sm:flex sm:justify-center sm:items-center'>
        <div className='bg-white p-5 w-full h-screen sm:h-[90%] sm:w-96 sm:rounded-3xl sm:shadow-2xl'>
          <img src={ParkiezLogo} alt="parkiez-logo" className='mx-auto' />
          <form className='flex flex-col gap-5' action="">
            <TextInput type="number" label="Phone Number" placeholder="9921388893"/>
            <TextInput type="password" label="Password" placeholder="xxxxxx" />
            <CustomBtn text="Send OTP" type="btn" textcolor="white" />
            <TextInput type="number" label="OTP" placeholder="xxxxxx" />
            <CustomBtn text="Login" type="submit" textcolor="white" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Operatorlogin