import { create } from "zustand";
import { devtools } from "zustand/middleware";
export type  UseUserStoreType = {
  userInfo: {
    id: string;
    phone: string;
    nickname: string;
    full_name: string;
    balance: number;
  };
  setUserInfo: (userInfo?: UseUserStoreType['userInfo']) => void;
}
export type UseDemoStoreType = {
  count: number;
  inc: () => void;
};

export const useDemoStore = create<UseDemoStoreType>()(
  devtools((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),
  }))
);

export const useUserStore = create<UseUserStoreType>()(
  devtools((set) => ({
    userInfo:  {
      id: '',
      phone: '',
      nickname: '',
      full_name: '',
      balance: 0,
  },
    setUserInfo: (userInfo?: UseUserStoreType['userInfo']) => set({ userInfo }),
  }))
);
