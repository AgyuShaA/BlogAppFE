import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "nl"],

  localePrefix: "as-needed",
  localeDetection: true,
  defaultLocale: "en",
});
