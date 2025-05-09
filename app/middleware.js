import { NextResponse } from "next/server";

export function middleware(request) {
  let cookie = request.cookies.get("language");
  const browserLang = request.headers.get("accept-language");
  const response = NextResponse.next();
  if (!cookie) {
    const lang = browserLang.includes("pl") ? "pl" : "en";
    response.cookies.set("language", lang);
  }

  return response;
}
