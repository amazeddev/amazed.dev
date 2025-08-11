import "../styles/globals.scss";
import "../styles/prism.scss";
import search from "../search.json";
import Head from "next/head";
import RootLayout from "../components/RootLayout";
import { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { AppProps, Language, Translations } from "../types";
import type { AppType } from "next/app";

const allTranslations: Translations = require("../public/locales/translations.json");

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const [language, setLanguage] = useState<Language>("en"); // Initialize with the current locale
  const [page, setPage] = useState(1);
  const [translations, setTranslations] = useState(allTranslations[language]);
  const router = useRouter();

  useEffect(() => {
    const langCookie = cookieCutter.get("language");
    if (langCookie) {
      setLanguage(langCookie as Language);
    }
  }, []);

  useEffect(() => {
    setTranslations(allTranslations[language]);
  }, [language]);

  const toggleLocale = () => {
    const newLocale: Language = language === "en" ? "pl" : "en";
    cookieCutter.set("language", newLocale);
    setPage(1);
    setLanguage(newLocale);
    setTranslations(allTranslations[newLocale]);

    if (router.route !== "/about") {
      if (
        router.pathname === "/blog/[lang]/[slug]" &&
        router.query &&
        search.find(
          (post) => post.slug === router.query.slug && post.lang === newLocale
        )
      ) {
        router.push(`/blog/${newLocale}/${router.query.slug}`);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Amazed.DEV - Blog</title>
        <meta name="description" content="Blog o programowaniu" />
        <meta
          name="keywords"
          content="backend,node,go,blog,aws,devops,terraform"
        />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Sebastian Luszczek" />
        <meta name="language" content="en,pl" />
        <link rel="canonical" href="https://amazed.dev" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph */}
        <meta property="og:title" key="og:title" content="Amazed.DEV" />
        <meta
          property="og:url"
          key="og:url"
          content="https://www.amazed.dev/"
        />
        <meta
          property="og:image"
          key="og:image"
          content="https://www.amazed.dev/images/og_bgi.jpg"
        />
        <meta
          property="og:description"
          key="og:description"
          content="Blog poświęcony nauce programowania"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Amazed.DEV" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta
          name="twitter:card"
          key="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:site"
          key="twitter:site"
          content="@AmazedDeveloper"
        />
        <meta
          name="twitter:creator"
          key="twitter:creator"
          content="@AmazedDeveloper"
        />
        <meta
          name="twitter:image"
          content="https://www.amazed.dev/images/og_bgi.jpg"
        />
        <meta name="twitter:title" content="Amazed.DEV" />
        <meta
          name="twitter:description"
          content="Blog poświęcony nauce programowania"
        />

        {/* Mobile & PWA */}
        <meta name="theme-color" content={"#111"} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content={"#111"} />
        <meta name="apple-mobile-web-app-title" content="Amazed.DEV" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
      </Head>
      <RootLayout
        language={language}
        toggleLocale={toggleLocale}
        translations={translations}
      >
        <Component
          {...pageProps}
          translations={translations}
          language={language}
          toggleLocale={toggleLocale}
          page={page}
          setPage={setPage}
        />
      </RootLayout>
    </>
  );
};

export default MyApp;
