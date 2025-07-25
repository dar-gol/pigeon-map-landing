import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Create the intl middleware
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add noindex header for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // Apply internationalization middleware for other routes
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next`, `/_vercel`, or `/admin`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // Note: /dashboard is handled separately for SEO headers
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
