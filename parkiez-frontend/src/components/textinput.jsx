import React from 'react';

const TextInput = ({ type, label, placeholder, required, value, onChange }) => (
  <div className='flex flex-col'>
    <label className='mb-2 ml-1 font-semibold'>{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      required={required} 
      value={value} 
      onChange={onChange} 
      className='p-2 pl-4 border rounded-lg bg-slate-50 shadow-sm'
    />
  </div>
);

export default TextInput;
