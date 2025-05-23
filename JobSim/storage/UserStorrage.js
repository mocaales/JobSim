import { create } from 'zustand';

export const useUserStore = create((set) => ({
  userEmail: null,
  setUserEmail: (email) => set({ userEmail: email }),
}));