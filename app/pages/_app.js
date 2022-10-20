import "../styles/globals.scss";
import "../styles/prism.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import SearchModal from "../components/SearchModal";

function MyApp({ Component, pageProps }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className={`content ${isOpen ? "modal-open" : ""}`}>
      <Header setIsOpen={setIsOpen} />
      <div className="container">
        <Component {...pageProps} />
      </div>
      <Footer />
      {isOpen && <SearchModal setIsOpen={setIsOpen} />}
    </main>
  );
}

export default MyApp;
