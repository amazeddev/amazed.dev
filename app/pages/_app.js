import "../styles/globals.scss";
import "../styles/prism.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <main className="content">
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
      <Footer />
    </main>
  );
}

export default MyApp;
