export interface ILangStore {
  lang: "en" | "ar",
  setLang: (newLang: "en" | "ar") => void
};