import { create } from 'zustand';
import { devtools } from "zustand/middleware";
import { IGlobalStore } from '../types/zustand/global';

export const useGlobalStore = create<IGlobalStore>()(
  devtools(
    (set) => ({
      isAuthenticated: 'pending',
      setIsAuthenticated: (isAuthenticated: any) => set(() => ({ isAuthenticated }),
        undefined,
        'GlobalStore/setIsAuthenticated'
      ),
    } as IGlobalStore),
    { name: 'GlobalStore' }
  )
);