import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { addToLocalStorage } from "../utils/manageLocalStorage";
import { LOCAL_STORAGE_KEYS } from "../constants/local-storage-keys";
import { addDjangoLangToCookies } from "../utils/addDjangoLangToCookies";
import { getLang } from "../utils/localStorageUtils";
import i18n from '../tools/i18n';

const useLangChange = () => {
  const lang = getLang();

  const { i18n: { language } } = useTranslation();

  useEffect(() => {
    addDjangoLangToCookies(lang);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const currentDir = html.getAttribute("dir");
    const newDir = language === "ar" ? "rtl" : "ltr";

    if (currentDir !== newDir) {
      html.setAttribute("dir", newDir);
      html.setAttribute("lang", language);
    }
  }, [language]);
};

export default useLangChange;

export const handleChangeLanguage = (lang) => {
  let newLanguage;
  if(lang){
    newLanguage = lang === "ar" ? "ar" : "en";
  }else{
    newLanguage = getLang() === "ar" ? "en" : "ar";
  }
  addToLocalStorage(LOCAL_STORAGE_KEYS.LANGUAGE, newLanguage);
  i18n.changeLanguage(newLanguage);
  addDjangoLangToCookies(newLanguage);

  return newLanguage;
};