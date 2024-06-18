import React from 'react'

const TextInput = ({label,type,placeholder,required}) => {
  return (
    <div className='flex flex-col '>
      <label className='text-xl font-semibold pl-2'>{label}</label>
      <input className='bg-slate-50 border-2 border-green-5000 p-2 pl-5 text-xl rounded-xl outline-none font-sans focus:border-black' type={type} placeholder={placeholder} required={required} />
    </div> 
  )
}

export default TextInput