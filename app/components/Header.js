import Link from "next/link";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LanguageSwitcher from "./LanguageSwitch";

export default function Header({ setIsOpen, toggleLocale, language }) {
  return (
    <header>
      <nav className="navbar">
        <Link href="/" legacyBehavior={true}>
          <div className="logo">
            <h2>amazed</h2>
            <h1>.dev</h1>
          </div>
        </Link>
        <LanguageSwitcher toggleLocale={toggleLocale} language={language} />
        <Link href="/">Blog</Link>
        <Link href="/about">About</Link>
        <div onClick={() => setIsOpen(true)} className="search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </nav>
    </header>
  );
}
