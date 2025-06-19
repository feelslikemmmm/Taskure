import { create } from 'zustand';

type AuthReadyState = {
  isAuthReady: boolean;
  setAuthReady: (ready: boolean) => void;
};

export const useAuthReadyStore = create<AuthReadyState>((set) => ({
  isAuthReady: false,
  setAuthReady: (ready) => set({ isAuthReady: ready }),
}));
