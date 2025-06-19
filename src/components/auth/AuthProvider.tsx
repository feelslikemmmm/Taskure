'use client';
import { useAuthReadyStore, useUserStore } from '@/lib/store/index';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { auth, db } from '@/lib/firebase/firebase';

export default function AuthProvider() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUserSession);
  const setAuthReady = useAuthReadyStore((state) => state.setAuthReady);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const appUser = {
            uid: userData.uid,
            email: userData.email,
            name: userData.name,
            photoURL: userData.photoURL,
          };
          setUser(appUser);
        }
      } else {
        clearUser();
      }
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setAuthReady]);

  return null;
}
