import React from 'react';

const CustomBtn = ({ text, type, textcolor, onClick }) => (
  <button 
    type={type} 
    className={`py-2 px-4 bg-green-600 text-${textcolor} rounded hover:bg-green-700`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default CustomBtn;
