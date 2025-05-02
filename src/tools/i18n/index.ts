import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJSON from '../../locale/en.json';
import arJSON from '../../locale/ar.json';
import { getLang } from "../../utils/localStorageUtils";

const lang = getLang();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...enJSON } },
    ar: { translation: { ...arJSON } },
  },
  lng: lang || "en",
});

export default i18n;