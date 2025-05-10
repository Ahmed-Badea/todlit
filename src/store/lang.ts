import { create } from 'zustand';
import { devtools } from "zustand/middleware";
import type { ILangStore } from '../types/zustand/lang';
import { getLang } from '../utils/localStorageUtils';

export const useLangStore = create<ILangStore>()(
  devtools(
    (set) => ({
      lang: getLang(),
      setLang: (lang) => set(() => ({ lang }),
        undefined,
        'LanguageStore/setLang'
      ),
    } as ILangStore),
    { name: 'LanguageStore' }
  )
);