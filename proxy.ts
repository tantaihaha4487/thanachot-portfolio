import { NextResponse } from "next/server";

export function proxy() {
  return NextResponse.next();
}

export const proxyConfig = {
  matcher: "/:path*",
};
