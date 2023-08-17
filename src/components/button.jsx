import React from 'react';

const Button = ({ children, className, type = 'inherit' }) => {
  return (
    <button
      type={type}
      className={`w-[50%] h-[45px] bg-primary rounded-full text-white text-[16px] font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
