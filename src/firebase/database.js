import { getDatabase, update, ref, get } from 'firebase/database';
import firebaseApp from './config';
import { auth, getCurrentUser } from './auth';

export const db = getDatabase(firebaseApp);

export function createUserNode(userId, name, avatar) {
  update(ref(db, 'users/' + userId), {
    name,
    avatar,
    status: 'offline',
  });
}

export function createUserChat(otherUserId, data, isOtherUser = false) {
  getCurrentUser().then((res) => {
    const chatKey = isOtherUser ? otherUserId : res.uid;
    const chatDetailKey = isOtherUser ? res.uid : otherUserId;
    update(ref(db, `users/${chatKey}/chats`), {
      [chatDetailKey]: !isOtherUser
        ? data
        : { name: res.displayName, avatar: res.photoURL },
    });
  });
}

export function createMessage(chatId, messageData, uuid) {
  update(ref(db, `chats/${chatId}/messages/${uuid}`), messageData);
}

export const getAllUsers = () => {
  return new Promise((resolve, reject) =>
    get(ref(db, 'users'))
      .then((snapshot) => {
        const currentUserId = auth.currentUser.uid;
        const users = snapshot.val();
        delete users[currentUserId];
        resolve(users);
      })
      .catch((error) => {
        reject(error.message);
      })
  );
};

export const getAllChats = () => {
  return new Promise(async (resolve, reject) => {
    const user = await getCurrentUser();
    get(ref(db, `users/${user.uid}/chats`))
      .then((snapshot) => {
        const chats = snapshot.val();
        resolve(Object.values(chats));
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
