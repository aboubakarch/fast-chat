import React from 'react';

const ChatContainer = ({ children, className }) => {
  return (
    <div
      className={`w-[90%] h-[90%] flex bg-white shadow-sm rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default ChatContainer;
