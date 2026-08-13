import { NextResponse } from "next/server"
import { auth } from "./lib/auth";

// Use only one of the two proxy options below
// 1. Use proxy directly
// export const { auth: proxy } = NextAuth(authConfig)

// 2. Wrapped proxy option
export default auth(async (req) => {
  const token = req.auth;
  if (!token) return NextResponse.redirect(req.nextUrl.origin + "/login");
  return NextResponse.next();
})

export const config = {
  matcher: ["/admin/:path*"],
};
