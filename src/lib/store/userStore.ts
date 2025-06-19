// src/lib/store/userStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '@/types';

type UserStoreState = {
  user: User | null;
};

type UserStoreActions = {
  setUser: (user: User | null) => void;
  clearUserSession: () => void;
};

export const useUserStore = create<UserStoreState & UserStoreActions>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUserSession: () => set({ user: null }),
  }))
);
