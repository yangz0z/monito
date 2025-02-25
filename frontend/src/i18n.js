import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      myAccount: "My Account",
      logout: "Logout",
    },
  },
  ko: {
    translation: {
      myAccount: "내 계정",
      logout: "로그아웃",
    },
  },
};

i18n
  .use(LanguageDetector) // 브라우저 언어 감지
  .use(initReactI18next) // React와 연결
  .init({
    resources,
    lng: localStorage.getItem("language") || "ko", // ✅ 초기값을 localStorage에서 가져옴
    fallbackLng: "ko", // 기본 언어
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
