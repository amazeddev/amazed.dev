import Head from "next/head";
import { ReactNode } from "react";
import { Alternates, Language } from "../types";
import { SITE_URL } from "../utils/i18n";

interface SeoProps {
  title: string;
  description: string;
  language: Language;
  /** Path without the language prefix, e.g. "/about"; "" for the home page. */
  path: string;
  alternates: Alternates;
  image?: string;
  type?: "website" | "article";
  children?: ReactNode;
}

const OG_LOCALE: Record<Language, string> = { en: "en_US", pl: "pl_PL" };

export default function Seo({
  title,
  description,
  language,
  path,
  alternates,
  image = `${SITE_URL}/images/og_bgi.jpg`,
  type = "website",
  children,
}: SeoProps) {
  const url = `${SITE_URL}/${language}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {alternates.en && alternates.pl && (
        <>
          <link rel="alternate" hrefLang="en" href={`${SITE_URL}${alternates.en}`} />
          <link rel="alternate" hrefLang="pl" href={`${SITE_URL}${alternates.pl}`} />
          {path === "" && (
            <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />
          )}
        </>
      )}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={OG_LOCALE[language]} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {children}
    </Head>
  );
}
