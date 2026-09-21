import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { getI18nProps } from "../lib/i18n";
import { PageI18nProps } from "../types";
import { pageAlternates } from "../utils/i18n";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Amazed.DEV</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="container-content">
        <h1 className="post-title">404</h1>
        <p>Page not found. / Nie znaleziono strony.</p>
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
