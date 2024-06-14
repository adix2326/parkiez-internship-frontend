import React from 'react';

const Button = ({ text, color, textcolor}) => {
  return (
    <button className={`bg-${color}-500 hover:bg-${color}-600 text-${textcolor} font-bold font-sans py-2 px-4 rounded w-full hover:shadow-xl` }>
      {text}
    </button>
  );
};

export default Button;
