/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import ChatContainer from '@/components/Chat/chat-container';
import ChatItem from '@/components/Chat/chat-item';
import ChatMsg from '@/components/Chat/chat-msg';
import ChatSideBar from '@/components/Chat/chat-sidebar';
import SidebarHeader from '@/components/Chat/sidear-header';
import Divider from '@/components/divider';
import { getCurrentUser, logout } from '@/firebase/auth';
import SendIcon from '@/svgs/send-icon';
import cookies from 'js-cookie';
import Image from 'next/image';
import {
  createMessage,
  createUserChat,
  getAllChats,
  getAllUsers,
  db,
} from '@/firebase/database';
import { ref, onValue, off } from 'firebase/database';
import { uuidv4 } from '@firebase/util';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { data } from 'autoprefixer';

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [msg, setMsg] = useState('');
  const [chats, setUserChats] = useState();
  const [activeChat, setActiveChat] = useState({});
  const [messages, setMessages] = useState({});

  const getUserData = () => {
    getCurrentUser().then((res) => {
      setUser(res);
    });
  };

  const handleLogout = () => {
    logout().then(() => {
      cookies.remove('access_token');
      router.replace('/login');
    });
  };

  const handleCreateChat = (oid, data) => {
    const date = Date.now();
    const mid = uuidv4();
    const messageData = {
      message: 'Hi!',
      sendBy: { name: user.displayName, avatar: user.photoURL, uid: user.uid },
      sendAt: date,
      isSeen: false,
    };
    createUserChat(oid, data);
    createUserChat(oid, '', true);
    createMessage(`${user.uid}${oid}`, messageData, mid);
    createMessage(`${oid}${user.uid}`, messageData, mid);
  };

  const handleMessage = (e) => {
    const { value } = e.target;
    setMsg(value);
  };

  const handleSendMessage = () => {
    const date = Date.now();
    const mid = uuidv4();
    const messageData = {
      message: msg,
      sendBy: { name: user.displayName, avatar: user.photoURL, uid: user.uid },
      sendAt: date,
      isSeen: false,
    };
    setMsg('');
    createMessage(`${user.uid}${activeChat.uid}`, messageData, mid);
    createMessage(`${activeChat.uid}${user.uid}`, messageData, mid);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    let messagesListener;
    if (user) {
      const userChatRef = ref(db, `users/${user.uid}/chats`);
      messagesListener = onValue(userChatRef, (snapshot) => {
        const data = snapshot.val();
        setUserChats(Object.entries(data || {}) || {}); // Set an empty oject if data is null
      });
    }

    // Clean up the listener when the component unmounts
    return () => {
      messagesListener?.length && off(messagesListener); // Remove the listener to avoid memory leaks
    };
  }, [user]);

  useEffect(() => {
    let messagesListener;
    if (user) {
      const usersRef = ref(db, `users`);
      messagesListener = onValue(usersRef, (snapshot) => {
        const currentUserId = user.uid;
        const users = snapshot?.val() || {};
        const userChat = Object.entries(users || {}).find(
          ([key, data]) => key === currentUserId
        );

        const [a, chats] = [...userChat];
        Object.keys(chats?.chats || {}).forEach((item) => delete users[item]);
        delete users[currentUserId];
        setUsers(users); // Set an empty oject if data is null
      });
    }

    // Clean up the listener when the component unmounts
    return () => {
      messagesListener?.length && off(messagesListener); // Remove the listener to avoid memory leaks
    };
  }, [user]);

  let messagesListener;
  useEffect(() => {
    if (user && activeChat) {
      if (messagesListener?.length) {
        off(messagesListener);
      }
      const currentUserId = user.uid;
      const oid = activeChat.uid;

      const chatRef = ref(db, `chats/${currentUserId}${oid}/messages`);
      messagesListener = onValue(chatRef, (snapshot) => {
        const messages = snapshot.val() || {};
        const arrayMsg = Object.values(messages);

        if (arrayMsg?.[arrayMsg.length - 1].sendBy.uid !== user.uid) {
          const audio = new Audio('/bell.mp3');
          audio.play();
        }
        setMessages(messages); // Set an empty oject if data is null
      });
    }

    // Clean up the listener when the component unmounts
    return () => {
      messagesListener?.length && off(messagesListener); // Remove the listener to avoid memory leaks
    };
  }, [user, activeChat]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <ChatContainer>
        <ChatSideBar>
          <SidebarHeader />
          <Divider />
          {chats ? (
            chats?.map(([key, data]) => (
              <ChatItem
                key={key}
                data={data}
                onClick={() => setActiveChat({ ...data, uid: key })}
              />
            ))
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <p className="text-[12px] text-gray-300">No Chats Exist</p>
            </div>
          )}
        </ChatSideBar>
        <div className="w-2/4 h-full px-[20px] py-[30px]">
          {chats ? (
            <>
              <div className="w-full flex items-center mb-[20px]">
                <Image
                  className="object-cover rounded-full"
                  src={activeChat.avatar}
                  alt="Avatar"
                  width={45}
                  height={45}
                />
                <p className="text-primary text-[15px] font-bold mx-[10px]">
                  {activeChat.name}
                </p>
                <div className="h-[15px] w-[15px] rounded-full bg-green-500" />
                <p
                  className="text-[14px] cursor-pointer text-primary ml-[20px] hover:text-secondary"
                  onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
              <Divider />
              <div className="w-full h-[85%] overflow-scroll">
                {Object.entries(messages || {})
                  .sort((a, b) => a[1].sendAt - b[1].sendAt)
                  .map(([key, data]) => (
                    <ChatMsg
                      key={key}
                      data={data}
                      type={
                        data.sendBy.uid === user.uid ? 'sender' : 'receiver'
                      }
                    />
                  ))}
              </div>
              <div className="w-full flex items-center">
                <input
                  onChange={handleMessage}
                  value={msg}
                  type="text"
                  placeholder="Starte typing here..."
                  className="w-[90%] h-[45px] border-[1px] border-[#c3c3c3] rounded-full mr-[10px] px-[12px] text-[16px]"
                />
                <SendIcon onClick={handleSendMessage} />
              </div>
            </>
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <p className="text-[12px] text-gray-300">No Chats Exist</p>
            </div>
          )}
        </div>
        <ChatSideBar>
          <h1 className="text-primary text-[16px] font-semibold my-[20px]">
            Other Users
          </h1>
          <Divider />
          {Object.entries(users || {}).map(([key, data]) => (
            <ChatItem
              key={key}
              data={data}
              onClick={() => handleCreateChat(key, data)}
            />
          ))}
        </ChatSideBar>
      </ChatContainer>
    </div>
  );
}
