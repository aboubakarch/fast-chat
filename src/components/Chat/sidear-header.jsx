import Image from 'next/image';
import React from 'react';

const SidebarHeader = () => {
  return (
    <div className="w-full flex items-center">
      <Image
        className="object-cover rounded-full"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
        alt="Avatar"
        width={45}
        height={45}
      />
      <div className="flex flex-col ml-[10px]">
        <p className="text-[#4399ff] text-[15px] font-bold">John Walker</p>
        <p className="text-[10px] text-green-500">Online</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
