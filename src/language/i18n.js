import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/common/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "ru",
    debug: false,
    ns: [
      "sidebar",
      "profil",
      "shops",
      "locations",
      "mobileMenu",
      "product",
      "reviews",
      "signIn",
      "signUp",
      "forgotPassword",
      "resetPassword",
      "mailVerify",
    ],
    interpolation: {
      espaceValue: false,
      formatSeparator: ",",
    },
    react: {
      wait: true,
    },
  });
export default i18n;
