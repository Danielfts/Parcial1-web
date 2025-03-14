import enMessages from "@/locales/en.json";
import esMessages from "@/locales/es.json";
import { createContext } from "react";

const localesMessages: { [key: string]: { [key: string]: string } } = {
  en: enMessages,
  es: esMessages,
};

const getDefaultLocale = () => {
  const navLang = navigator.language;
  console.log(`Browser language: ${navLang}`);
  const fallbackLocale = "en";
  const browserLocale = navLang || fallbackLocale;
  const baseLocale = browserLocale.split("-")[0];
  return baseLocale;
};

const defaultLocale = getDefaultLocale();

const getMessages = (locale: string): { [key: string]: string } | null => {
  return localesMessages[locale] || null;
};

const LocaleContext = createContext({
  locale: defaultLocale,
  changeLocale: (_: string) => {},
});

export default LocaleContext;
export { localesMessages, defaultLocale, getMessages };
