import React from 'react';

const ErrorMsg = ({ error }) => {
  return <p className="text-red-500 text-[12px] pl-[10px]">{error}</p>;
};

export default ErrorMsg;
