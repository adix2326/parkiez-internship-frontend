import React from 'react';

const Button = ({ text, textcolor, type}) => {
  return (
    <button type={type} className={`bg-green-500 hover:bg-green-600 text-${textcolor} font-bold font-serif py-2 px-4 rounded-full w-56 mx-auto shadow-md hover:shadow-xl` }>
      {text}
    </button>
  );
};

export default Button;
