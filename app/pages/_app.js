import "../styles/globals.scss";
import "../styles/prism.scss";
import search from "../search.json";
import Head from "next/head";
import RootLayout from "../components/RootLayout";
import { useEffect, useState } from "react";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

const allTranslations = require("../public/locales/translations.json");

function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState("en"); // Initialize with the current locale
  const [page, setPage] = useState(1);
  const [translations, setTranslations] = useState(allTranslations[language]);
  const router = useRouter();

  useEffect(() => {
    const langCookie = cookieCutter.get("language");
    if (langCookie) {
      setLanguage(langCookie);
    }
  }, []);

  useEffect(() => {
    setTranslations(allTranslations[language]);
  }, [language]);

  const toggleLocale = () => {
    const newLocale = language === "en" ? "pl" : "en";
    cookieCutter.set("language", newLocale);
    setPage(1);
    setLanguage(newLocale);
    setTranslations(allTranslations[newLocale]);

    if (router.route !== "/about") {
      if (
        router.pathname === "/blog/[lang]/[slug]" &&
        router.query &&
        search.find(
          (post) => post.slug === router.query.slug && post.lang === newLocale,
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
        <meta
          name="description"
          hid="description"
          content="Blog o programowaniu"
        />
        <meta
          name="keywords"
          content="backend,node,go,blog,aws,devops,terraform"
        />
        <meta name="robots" hid="robots" content="index,follow" />
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
        <meta
          hid="og:title"
          property="og:title"
          key="og:title"
          content="Amazed.DEV"
        />
        <meta
          hid="og:url"
          property="og:url"
          key="og:url"
          content="https://www.amazed.dev/"
        />
        <meta
          hid="og:image"
          property="og:image"
          key="og:image"
          content="https://www.amazed.dev/images/og_bgi.jpg"
        />
        <meta
          hid="og:description"
          property="og:description"
          key="og:description"
          content="Blog poświęcony nauce programowania"
        />
        <meta name="theme-color" content={"#111"} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content={"#111"} />

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
}

export default MyApp;
