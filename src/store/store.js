import { create } from 'zustand'

export const useUserStore = create((set) => ({

  Username: "Psycho",
  SetUsername: (newUsername) => set({Username:newUsername}),
  Email: "",
  SetEmail: (newEmail) => set({ Email:newEmail }),
  UserId: "",
  SetUserId: (newId) => set({ UserId:newId }),
  IsLogin: false,
  SetIsLogin: (newIsLogin) => set({ isLogin: newIsLogin }),
  



}))