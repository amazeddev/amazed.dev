import Document, { Html, Head, Main, NextScript } from "next/document";

// The site is statically exported, so <html lang> comes from the `language`
// prop that every page returns from getStaticProps.
export default class MyDocument extends Document {
  render() {
    const lang = this.props.__NEXT_DATA__?.props?.pageProps?.language ?? "en";

    return (
      <Html lang={lang}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://cdn.jsdelivr.net" />
          <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
          <link
            href="https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Lacquer&family=Source+Code+Pro:wght@200..900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
