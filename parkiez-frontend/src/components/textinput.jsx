import React from 'react'

const TextInput = ({label,type,placeholder,required}) => {
  return (
    <div className='flex flex-col '>
      <label className='text-xl font-semibold pl-2 '>{label}</label>
      <input className='border-2 border-gray-500 p-2 text-xl rounded-md' type={type} placeholder={placeholder} required={required} />
    </div> 
  )
}

export default TextInput