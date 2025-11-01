import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const defaultLocale = request.headers.get("x-your-custom-locale") || "en";

  const handleI18nRouting = createMiddleware({
    locales: ["en", "nl"],
    defaultLocale: "en",
    localePrefix: "always",
  });
  const response = handleI18nRouting(request);

  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
