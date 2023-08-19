'use client';
import { getCurrentUser } from '@/firebase/auth';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const SidebarHeader = () => {
  const [user, setUser] = useState();

  const getUserData = async () => {
    getCurrentUser().then((res) => {
      setUser(res);
    });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="w-full flex items-center">
      <Image
        className="object-cover rounded-full"
        src={user?.photoURL || ''}
        alt="Avatar"
        width={45}
        height={45}
      />
      <div className="flex flex-col ml-[10px]">
        <p className="text-[#4399ff] text-[15px] font-bold">
          {user?.displayName}
        </p>
        <p className="text-[10px] text-green-500">Online</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
