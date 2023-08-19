import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import firebaseApp from './config';
import cookies from 'js-cookie';
import { createUserNode } from './database';

export const auth = getAuth(firebaseApp);

const setAccessToken = async (user) => {
  const token = await user.getIdToken();
  cookies.set('access_token', token);
};

export const signup = (email, password, name, avatar) => {
  return new Promise((resolve, reject) =>
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        createUserNode(resp.user.uid, name, avatar);
        setAccessToken(resp.user);

        await updateProfile(resp.user, { displayName: name, photoURL: avatar });
        resolve();
      })
      .catch((error) => {
        reject();
        console.log(error);
      })
  );
};

export const login = (email, password) => {
  return new Promise((resolve, reject) =>
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        setAccessToken(res.user);
        resolve();
      })
      .catch((error) => {
        console.log('Error', error);
        reject();
      })
  );
};

export const logout = () => {
  return signOut(auth);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((observer) => {
      try {
        resolve(observer);
      } catch (error) {
        reject(error);
      }
    });
  });
};
