import { create } from 'zustand';
import { devtools } from "zustand/middleware";
import type { IClassesStore } from '../types/zustand/classes';

export const useClassesStore = create<IClassesStore>()(
  devtools(
    (set) => ({
      classes: [],

      setClasses: (newState: any) => set(() => ({ classes: [ ...newState ] }),
        undefined,
        'ClassesStore/setClasses'
      )

    } as IClassesStore),
    { name: 'ClassesStore' }
  ),
);