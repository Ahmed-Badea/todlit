import { create } from 'zustand';
import { devtools } from "zustand/middleware";
import type { IUserInfoStore } from '../types/zustand/userInfo';

const emptyState = {
  logo: "",
  firstName: "",
  lastName: "",
  name: "",
  shortName: "",
  profileType: ""
};

export const useUserInfoStore = create<IUserInfoStore>()(
  devtools(
    (set) => ({
      userInfo: emptyState,
      setUserInfo: (newState) => set((prevState) => ({ userInfo: { ...prevState.userInfo, ...newState } }),
        undefined,
        'UserInfoStore/setUserInfo'
      ),
      resetUserInfo: () => set(() => ({ userInfo: emptyState }))
    } as IUserInfoStore),
    { name: 'UserInfoStore' }
  )
);