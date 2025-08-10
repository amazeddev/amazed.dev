import { NextResponse } from "next/server";
import { MiddlewareRequest } from "./types";

export function middleware(request: MiddlewareRequest) {
  let cookie = request.cookies.get("language");
  const browserLang = request.headers.get("accept-language");
  const response = NextResponse.next();
  if (!cookie) {
    const lang = browserLang?.includes("pl") ? "pl" : "en";
    response.cookies.set("language", lang);
  }

  return response;
}
