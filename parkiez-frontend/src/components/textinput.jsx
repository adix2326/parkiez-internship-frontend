import React from 'react';

const TextInput = ({ type, label, placeholder, required, value, onChange }) => (
  <div className='flex flex-col'>
    <label className='mb-2 font-medium'>{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      required={required} 
      value={value} 
      onChange={onChange} 
      className='p-2 border rounded'
    />
  </div>
);

export default TextInput;
