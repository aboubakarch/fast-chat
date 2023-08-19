import Image from 'next/image';
import React from 'react';

const ChatItem = ({ data, msg, onClick }) => {
  return (
    <div
      className="w-full flex items-center mb-[20px] cursor-pointer hover:bg-secondary hover:p-[10px]"
      onClick={onClick}
    >
      <Image
        className="object-cover rounded-full"
        src={data.avatar}
        alt="Avatar"
        width={45}
        height={45}
      />
      <div className="flex flex-col ml-[10px]">
        <p className="text-[#4399ff] text-[15px] font-bold">{data.name}</p>
        {msg && (
          <p className="text-[12px] text-[#959595]">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatItem;
