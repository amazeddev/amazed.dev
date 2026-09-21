import { Alternates, Language } from "../types";

export const LANGUAGES: Language[] = ["en", "pl"];
export const LANGUAGE_COOKIE = "language";
export const SITE_URL = "https://amazed.dev";

export const isLanguage = (value: unknown): value is Language =>
  value === "en" || value === "pl";

export const localePath = (lang: Language, path = ""): string =>
  `/${lang}${path}`;

// The same page in both languages, e.g. pageAlternates("/about")
// -> { en: "/en/about", pl: "/pl/about" }.
export const pageAlternates = (path = ""): Alternates => ({
  en: localePath("en", path),
  pl: localePath("pl", path),
});
