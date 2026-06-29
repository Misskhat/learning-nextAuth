import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request) {
  // return NextResponse.redirect(new URL("/home", request.url));

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

// export const config = {
//   matcher: "/about/:path*",
// };
