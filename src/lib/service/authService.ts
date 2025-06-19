import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';

import { useUserStore } from '@/lib/store/userStore';
import { persistUserSession } from './userSessionService';

export const clearUserSession = () =>
  useUserStore.getState().clearUserSession();

export async function emailSignIn(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return persistUserSession(credential.user);
}

export async function emailSignUp(email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return persistUserSession(credential.user);
}

export async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  return persistUserSession(credential.user);
}

export const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      const sessionUser = await persistUserSession(user);
      return sessionUser;
    }
  } catch (error) {
    console.error('Google 로그인 실패:', error);
    return null;
  }
};

// ✅ 로그아웃
export async function SignOut() {
  try {
    await signOut(auth);
    clearUserSession();
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
}
