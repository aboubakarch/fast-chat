import { getDatabase, update, ref } from 'firebase/database';
import firebaseApp from './config';

const db = getDatabase(firebaseApp);

export function createUserNode(userId) {
  update(ref(db, 'users/' + 'MMOjWrvxIyNEc2giJam9YnhfhJF3'), {
    chat: '',
  });
}

export function createChatNode() {
  set(ref(db, 'chats'));
}
