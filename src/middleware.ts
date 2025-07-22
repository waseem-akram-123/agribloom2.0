import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  const publicPaths = ["/", "/login", "/signup", "/verifyemail"];
  const protectedPaths = [
    "/agrilens",
    "/insect",
    "/agri-prices",
    "/healthandbenefits",
    "/complete-profile",
    "/edit-profile",
    "/profile",
    "/contactus",
    "/soil",
    "/biofertilizers",
    "/farmingtechniques",
    "/trees",
    "/logout",
    "/farmer/trends",
    "/farmer/dashboard",
    "/farmer/crop-entry",
    "/admin/analysis", // ✅ add here
  ];

  const isPublicPath = publicPaths.includes(path);
  const isProtectedPath = protectedPaths.some((p) =>
    path === p || path.startsWith(p + "/")
  );

  // Prevent redirect loop for logged-in users
  if (token && isPublicPath && path !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Prevent redirect loop for unauthenticated users
  if (!token && isProtectedPath && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // For /admin/analysis, ensure token exists and flag for role-check in page
  if (path === "/admin/analysis" && !token && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = NextResponse.next();

  if (token && isProtectedPath) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: [
    "/", "/login", "/signup", "/verifyemail",
    "/agrilens",
    "/insect",
    "/agri-prices",
    "/healthandbenefits",
    "/complete-profile",
    "/edit-profile",
    "/profile",
    "/contactus",
    "/soil",
    "/biofertilizers",
    "/farmingtechniques",
    "/trees",
    "/logout",
    "/farmer/trends",
    "/farmer/dashboard",
    "/farmer/crop-entry",
    "/admin/analysis",        // ✅ include here
    "/profile/:path*",
    "/farmer/:path*",
  ],
};