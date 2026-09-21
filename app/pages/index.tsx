import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { GetStaticProps } from "next";
import { getI18nProps } from "../lib/i18n";
import { PageI18nProps } from "../types";
import { LANGUAGE_COOKIE, isLanguage, pageAlternates } from "../utils/i18n";

// In production CloudFront redirects "/" before it reaches S3 (see
// terraform/functions/rewrite-uri.js). This page is the fallback for
// `next dev` and for any host without that function.
export default function Root() {
  useEffect(() => {
    const saved = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${LANGUAGE_COOKIE}=`))
      ?.split("=")[1];
    const lang = isLanguage(saved)
      ? saved
      : navigator.language.toLowerCase().startsWith("pl")
      ? "pl"
      : "en";

    window.location.replace(`/${lang}`);
  }, []);

  return (
    <>
      <Head>
        <title>Amazed.DEV</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="container-content">
        <p>
          <Link href="/en">English</Link> · <Link href="/pl">Polski</Link>
        </p>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<PageI18nProps> = async () => ({
  props: getI18nProps("en", pageAlternates()),
});
