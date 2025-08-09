import Link from "next/link";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LanguageSwitcher from "./LanguageSwitch";
import { useState } from "react";

export default function Header({ setIsOpen, toggleLocale, language }) {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <header>
      <nav className={`navbar ${burgerOpen ? "burger-open" : "burger-closed"}`}>
        <Link href="/" legacyBehavior={true}>
          <div className="logo">
            <h2>amazed</h2>
            <h1>.dev</h1>
          </div>
        </Link>
        <LanguageSwitcher toggleLocale={toggleLocale} language={language} />
        <div className="nav-btns">
          <Link href="/">Blog</Link>
          <Link href="/about">About</Link>
          <div onClick={() => setIsOpen(true)} className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>

        <div className="burger" onClick={() => setBurgerOpen(!burgerOpen)}>
          <div class={`bar1 ${burgerOpen ? "change" : ""}`}></div>
          <div class={`bar2 ${burgerOpen ? "change" : ""}`}></div>
          <div class={`bar3 ${burgerOpen ? "change" : ""}`}></div>
        </div>
        <div
          className={`burger-btns ${!burgerOpen ? "burger-close" : ""}`}
          onClick={() => setBurgerOpen(false)}
        >
          {/* <LanguageSwitcher toggleLocale={toggleLocale} language={language} /> */}
          <Link href="/">Blog</Link>
          <Link href="/about">About</Link>
          <div onClick={() => setIsOpen(true)} className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </nav>
    </header>
  );
}
