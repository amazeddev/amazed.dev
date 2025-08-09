import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SearchModal from "./SearchModal";

export const dynamic = "force-static";

export default function RootLayout({
  children,
  language,
  toggleLocale,
  translations,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={`content ${isOpen ? "modal-open" : ""}`}>
        <Header
          setIsOpen={setIsOpen}
          language={language}
          toggleLocale={toggleLocale}
        />
        <main className="main">
          <div className="container">{children}</div>
        </main>
        <Footer />
        {isOpen && (
          <SearchModal
            setIsOpen={setIsOpen}
            language={language}
            translations={translations}
          />
        )}
      </div>
    </>
  );
}
