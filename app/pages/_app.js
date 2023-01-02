import "../styles/globals.scss";
import "../styles/prism.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import SearchModal from "../components/SearchModal";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false);
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
      <main className={`content ${isOpen ? "modal-open" : ""}`}>
        <Header setIsOpen={setIsOpen} />
        <div className="container">
          <Component {...pageProps} />
        </div>
        <Footer />
        {isOpen && <SearchModal setIsOpen={setIsOpen} />}
      </main>
    </>
  );
}

export default MyApp;
