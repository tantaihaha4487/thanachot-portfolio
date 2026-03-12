import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  
  if (hostname.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.hostname = hostname.replace("www.", "");
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

export const proxyConfig = {
  matcher: "/:path*",
};
