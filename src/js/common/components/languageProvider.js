import React, { createContext, useState, useContext } from "react";
import i18n from "i18next";
import { I18nManager } from "react-native";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang).then(() => {
      I18nManager.forceRTL(lang === "ar");
      setLanguage(lang);
    });
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
