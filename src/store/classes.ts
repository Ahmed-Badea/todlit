import { create } from 'zustand';
import { devtools } from "zustand/middleware";
import type { IClassesStore } from '@app/types/zustand/classes';

export const useClassesStore = create<IClassesStore>()(
  devtools(
    (set) => ({
      classes: [],

      setClasses: (newState) => set(() => ({ classes: [ ...newState ] }),
        undefined,
        'ClassesStore/setClasses'
      )

    } as IClassesStore),
    { name: 'ClassesStore' }
  ),
);