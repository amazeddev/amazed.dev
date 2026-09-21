import Link from "next/link";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LanguageSwitcher from "./LanguageSwitch";
import { useState } from "react";
import { HeaderProps, Language, Translation } from "../types";
import { localePath } from "../utils/i18n";

interface NavLinksProps {
  language: Language;
  translations: Translation;
  onSearch: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({
  language,
  translations,
  onSearch,
}) => (
  <>
    <Link href={localePath(language)}>{translations.header.home}</Link>
    <Link href={localePath(language, "/blog")}>{translations.header.blog}</Link>
    <Link href={localePath(language, "/projects")}>
      {translations.header.projects}
    </Link>
    <Link href={localePath(language, "/about")}>{translations.header.about}</Link>
    <button
      type="button"
      className="search-btn"
      onClick={onSearch}
      aria-label={translations.search.placeholder}
    >
      <FontAwesomeIcon icon={faSearch as any} />
    </button>
  </>
);

export default function Header({
  setIsOpen,
  language,
  translations,
  alternates,
}: HeaderProps) {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <header>
      <nav className={`navbar ${burgerOpen ? "burger-open" : "burger-closed"}`}>
        <Link href={localePath(language)} className="logo">
          <h2>amazed</h2>
          <h1>.dev</h1>
        </Link>
        <LanguageSwitcher
          language={language}
          alternates={alternates}
          translations={translations}
        />
        <div className="nav-btns">
          <NavLinks
            language={language}
            translations={translations}
            onSearch={() => setIsOpen(true)}
          />
        </div>

        <button
          type="button"
          className="burger"
          onClick={() => setBurgerOpen(!burgerOpen)}
          aria-label="Menu"
          aria-expanded={burgerOpen}
          aria-controls="mobile-menu"
        >
          <div className={`bar1 ${burgerOpen ? "change" : ""}`}></div>
          <div className={`bar2 ${burgerOpen ? "change" : ""}`}></div>
          <div className={`bar3 ${burgerOpen ? "change" : ""}`}></div>
        </button>
        <div
          id="mobile-menu"
          className={`burger-btns ${!burgerOpen ? "burger-close" : ""}`}
          onClick={() => setBurgerOpen(false)}
        >
          <NavLinks
            language={language}
            translations={translations}
            onSearch={() => setIsOpen(true)}
          />
        </div>
      </nav>
    </header>
  );
}
