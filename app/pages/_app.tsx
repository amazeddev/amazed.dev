import "../styles/globals.scss";
import "../styles/prism.scss";
import Head from "next/head";
import type { AppType } from "next/app";
import RootLayout from "../components/RootLayout";
import { AppProps } from "../types";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  const { language, translations, alternates } = pageProps;

  // Next's built-in error pages (/_error, /500) have no getStaticProps, so
  // there is nothing to build the layout from.
  if (!translations) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index,follow" />
        <meta name="author" content="Sebastian Luszczek" />
        <meta property="og:site_name" content="Amazed.DEV" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AmazedDeveloper" />
        <meta name="twitter:creator" content="@AmazedDeveloper" />

        {/* Mobile & PWA */}
        <meta name="theme-color" content="#111" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#111" />
        <meta name="apple-mobile-web-app-title" content="Amazed.DEV" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </Head>
      <RootLayout
        language={language}
        translations={translations}
        alternates={alternates}
      >
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
};

export default MyApp;
