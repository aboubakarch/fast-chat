import ChatContainer from '@/components/Chat/chat-container';
import ChatItem from '@/components/Chat/chat-item';
import ChatMsg from '@/components/Chat/chat-msg';
import ChatSideBar from '@/components/Chat/chat-sidebar';
import SidebarHeader from '@/components/Chat/sidear-header';
import Divider from '@/components/divider';
import SendIcon from '@/svgs/send-icon';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <ChatContainer>
        <ChatSideBar>
          <SidebarHeader />
          <Divider />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </ChatSideBar>
        <div className="w-3/4 h-full px-[20px] py-[30px] relative">
          <div className="w-full flex items-center mb-[20px]">
            <Image
              className="object-cover rounded-full"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
              alt="Avatar"
              width={45}
              height={45}
            />
            <p className="text-primary text-[15px] font-bold mx-[10px]">
              John Walker
            </p>
            <div className="h-[15px] w-[15px] rounded-full bg-green-500" />
          </div>
          <Divider />
          <ChatMsg />
          <ChatMsg type="sender" />
          <ChatMsg />
          <ChatMsg type="sender" />
          <div className="w-full flex absolute bottom-5 z-10 items-center">
            <input
              type="text"
              placeholder="Starte typing here..."
              className="w-[90%] h-[45px] border-[1px] border-[#c3c3c3] rounded-full mr-[10px] px-[12px] text-[16px]"
            />
            <SendIcon />
          </div>
        </div>
      </ChatContainer>
    </div>
  );
}
