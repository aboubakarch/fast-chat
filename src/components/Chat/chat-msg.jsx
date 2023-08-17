import Image from 'next/image';
import React from 'react';

const ChatMsg = ({ type = 'receiver' }) => {
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
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
        alt="Avatar"
        width={25}
        height={25}
      />
      <p className={msgClasses}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nisi
        alias, id ipsa laudantium cumque ipsum repellendus delectus
      </p>
    </div>
  );
};

export default ChatMsg;
