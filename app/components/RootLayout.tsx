import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SearchModal from "./SearchModal";
import FloatingIcons from "./FloatingIcons";
import { RootLayoutProps } from "../types";

export default function RootLayout({
  children,
  language,
  translations,
  alternates,
}: RootLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={`content ${isOpen ? "modal-open" : ""}`}>
        <Header
          setIsOpen={setIsOpen}
          language={language}
          translations={translations}
          alternates={alternates}
        />
        <main className="main">
          <div className="container">{children}</div>

          <FloatingIcons />
        </main>
        <Footer language={language} />
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
