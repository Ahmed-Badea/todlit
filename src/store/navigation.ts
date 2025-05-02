import { create } from 'zustand';
import { devtools } from "zustand/middleware";
import type { INavigationStore } from '../types/zustand/navigation';

export const useNavigationStore = create<INavigationStore>()(
  devtools(
    (set) => ({
      activeLink: { nav: "" },

      setActiveLink: (newState) => set((prevState) => ({ activeLink: { ...prevState.activeLink, ...newState } }),
        undefined,
        'NavigationStore/setActiveLink'
      )

    } as INavigationStore),
    { name: 'NavigationStore' }
  ),
);