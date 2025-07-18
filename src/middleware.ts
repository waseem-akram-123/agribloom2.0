// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const token = request.cookies.get("token")?.value;

//   const publicPaths = ["/", "/login", "/signup", "/verifyemail"];
//   const isPublicPath = publicPaths.includes(path);

//   const protectedPaths = [
//     "/complete-profile",
//     "/profile",
//     "/profile/:id*",
//     "/insect",
//     "/health-benefits",
//     "/current-rate",
//     "/agrilens",
//     "/contact",
//     "/study",
//     "/study/:path*"
//   ];

//   const isProtectedPath = protectedPaths.some((p) => {
//     if (p.endsWith(":id*")) return path.startsWith("/profile/");
//     if (p.endsWith(":path*")) return path.startsWith("/study/");
//     return path === p;
//   });

//   // ✅ 1. Redirect logged-in users away from login/signup
//   if (token && (path === "/login" || path === "/signup")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // ✅ 2. Block unauthenticated users from protected routes
//   if (!token && isProtectedPath) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // ✅ 3. Optional: If user visits protected route, disable caching
//   const response = NextResponse.next();
//   if (token && isProtectedPath) {
//     response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
//     response.headers.set("Pragma", "no-cache");
//     response.headers.set("Expires", "0");
//   }

//   return response;
// }

// export const config = {
//   matcher: [
//     "/",               // Home (open to all)
//     "/login",          // Public
//     "/signup",         // Public
//     "/verifyemail",    // Public
//     "/complete-profile",
//     "/profile",
//     "/profile/:id*",
//     "/insect",
//     "/health-benefits",
//     "/current-rate",
//     "/agrilens",
//     "/contact",
//     "/study",
//     "/study/:path*"
//   ],
// };



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
    "/farmer/crop-entry"
  ];

  const isPublicPath = publicPaths.includes(path);
  const isProtectedPath = protectedPaths.some((p) =>
    path === p || path.startsWith(p + "/")
  );

  // ✅ 1. Redirect logged-in users away from public pages
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ 2. Redirect unauthenticated users trying to access protected routes
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ 3. Disable caching on protected routes for logged-in users
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
    "/profile/:path*",       // dynamic profile paths
    "/farmer/:path*",        // dynamic farmer routes
  ],
};
