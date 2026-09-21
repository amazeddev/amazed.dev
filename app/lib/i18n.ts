// Server-only helpers (getStaticProps / getStaticPaths).
import { GetStaticPaths } from "next";
import translations from "../data/translations.json";
import {
  Alternates,
  Language,
  PageI18nProps,
  Translation,
  Translations,
} from "../types";
import { LANGUAGES, localePath } from "../utils/i18n";
import { getPostsByLang, getTagsByLang } from "./posts";

export function getTranslations(lang: Language): Translation {
  return (translations as unknown as Translations)[lang];
}

export function getI18nProps(
  lang: Language,
  alternates: Alternates
): PageI18nProps {
  return { language: lang, translations: getTranslations(lang), alternates };
}

export const getLangStaticPaths: GetStaticPaths = async () => ({
  paths: LANGUAGES.map((lang) => ({ params: { lang } })),
  fallback: false,
});

// A post has a counterpart only when the other language has it published.
export function postAlternates(slug: string): Alternates {
  const has = (lang: Language) =>
    getPostsByLang(lang).some((post) => post.slug === slug);

  return {
    en: has("en") ? localePath("en", `/blog/${slug}`) : null,
    pl: has("pl") ? localePath("pl", `/blog/${slug}`) : null,
  };
}

export function tagAlternates(tag: string): Alternates {
  const has = (lang: Language) => getTagsByLang(lang).includes(tag);

  return {
    en: has("en") ? localePath("en", `/blog/tag/${tag}`) : null,
    pl: has("pl") ? localePath("pl", `/blog/tag/${tag}`) : null,
  };
}
