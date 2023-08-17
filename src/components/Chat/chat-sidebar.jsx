import React from 'react';

const ChatSideBar = ({ children }) => {
  return (
    <div className="w-1/4 h-full bg-[#f0f0f0] px-[28px] py-[30px]">
      {children}
    </div>
  );
};

export default ChatSideBar;
