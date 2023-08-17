'use client';
import React from 'react';
import ErrorMsg from './error-msg';

const Input = ({
  placeholder = 'Enter here',
  name,
  className,
  type = 'text',
  register,
  error = '',
  required = false,
}) => (
  <div className={`w-[75%] ${className}`}>
    <input
      {...register(name, { required })}
      name={name}
      placeholder={placeholder}
      type={type}
      className="px-[15px] text-[16px] w-full h-[45px] rounded-full border-[1px] ourline-[1px] outline-primary border-gray-400"
    />
    <ErrorMsg error={error} />
  </div>
);
export default Input;
