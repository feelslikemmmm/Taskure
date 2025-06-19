import { User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/firebase';
import { User } from '@/types';
import { useUserStore } from '@/lib/store/userStore';

export const persistUserSession = async (
  firebaseUser: FirebaseUser
): Promise<User> => {
  const userData: User = {
    uid: firebaseUser.uid,
    email: firebaseUser.email ?? '',
    displayName: firebaseUser.displayName ?? '',
    photoURL: firebaseUser.photoURL ?? '',
    createdAt: new Date().toISOString(),
  };

  const userDocRef = doc(firestore, 'users', userData.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, userData);
  }

  const { setUser } = useUserStore.getState();
  setUser(userData);

  return userData;
};
