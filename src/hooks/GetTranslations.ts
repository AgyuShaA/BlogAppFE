import { Locale } from "../types/LocaleType";
import { en } from "../locales/en/home";
import { nl } from "../locales/nl/home";

export type DictionaryValue = string | Dictionary | string[];
export interface Dictionary {
  [key: string]: DictionaryValue;
}

type Namespace = "home";

const translations: Record<Locale, Record<Namespace, Dictionary>> = {
  en: {
    home: en,
  },
  nl: {
    home: nl,
  },
};

export function GetTranslations(locale: Locale, namespace: Namespace) {
  const dict = translations[locale]?.[namespace] ?? {};

  // eslint-disable-next-line
  function t(key: string): any {
    const result = key
      .split(".")
      .reduce((acc: DictionaryValue | undefined, part) => {
        if (acc && typeof acc === "object") {
          return (acc as Dictionary)[part];
        }
        return undefined;
      }, dict);
    // console.log(locale);

    // console.log(key);
    // console.log(result);
    return result;
  }

  return { t, locale };
}
