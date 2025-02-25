import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // ✅ PropTypes 추가
import i18n from "../i18n";

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ko"
  );

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language]);

  const changeLanguage = (lng) => {
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ✅ PropTypes를 사용하여 children의 타입을 명확하게 지정
LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LanguageContext };
export default LanguageProvider;
