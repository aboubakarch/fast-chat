import Image from 'next/image';
import React from 'react';

const ChatMsg = ({ type = 'receiver', data }) => {
  const containerClasses = `${
    type === 'receiver' ? '' : 'flex-row-reverse'
  } flex items-end mb-[12px]`;

  const msgClasses = `max-w-[45%] text-[13px] px-[10px] py-[7px] rounded-xl ${
    type === 'receiver'
      ? 'bg-secondary ml-[10px]'
      : 'text-white bg-primary mr-[10px]'
  }`;

  return (
    <div className={containerClasses}>
      <Image
        className="object-cover rounded-full"
        src={data.sendBy.avatar}
        alt="Avatar"
        width={25}
        height={25}
      />
      <p className={msgClasses}>{data.message}</p>
    </div>
  );
};

export default ChatMsg;
