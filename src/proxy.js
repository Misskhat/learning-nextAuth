import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRouter = ["/private", "/dashboard", "/admin"];
// This function can be marked `async` if using `await` inside
const adminRoute = ["/dashboard"];
export async function proxy(req) {
  // return NextResponse.redirect(new URL("/home", req.url));
  const reqPath = req.nextUrl.pathname;
  const token = await getToken({ req });
  const isAuthenticate = Boolean(token);
  const isUser = token?.role === "user";
  const isAdmin = token?.role === "admin";

  const isPrivate = privateRouter.some((route) => reqPath.startsWith(route));
  const isAdminRoute = adminRoute.some((route) => reqPath.startsWith(route));

  if (isPrivate && !isAuthenticate) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticate && !isAdmin && isAdminRoute) {
    return NextResponse.rewrite(new URL("/forbidden", req.url));
  }

  console.log({ isAuthenticate, reqPath, isPrivate, isUser });
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(req) { ... }

export const config = {
  matcher: ["/private/:path*", "/dashboard/:path*", "/admin/:path*"],
};
