import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

export default function proxy(req: NextRequest) {
  const url = req.nextUrl.clone()
  const pathname = url.pathname

  // -------------------------
  // 1. ADMIN PROTECTED ROUTES
  // -------------------------
  // Matches: /en/panel , /uk/panel , /nl/panel
  if (/^\/(en|uk|nl)\/admin(\/.*)?$/.test(pathname)) {
    const isLogged = req.cookies.get('admin_auth')?.value

    if (isLogged !== 'true') {
      // Redirect to auth screen (localized)
      const locale = pathname.split('/')[1]
      url.pathname = `/${locale}/admin-auth`
      return NextResponse.redirect(url)
    }
  }

  const i18nRes = createMiddleware(routing)(req)

  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('cloudfront-viewer-country') ||
    req.headers.get('X-Country') ||
    req.cookies.get('country')?.value ||
    'N/A'

  i18nRes.headers.set('x-country', country)
  i18nRes.cookies.set('x-country', country)

  return i18nRes


}

// -------------------------
// 3. MATCHER CONFIG
// -------------------------
export const config = {
  matcher: [
    // next-intl matcher
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    // admin routes must trigger middleware
    '/(en|uk|nl)/admin/:path*',
  ],
}
