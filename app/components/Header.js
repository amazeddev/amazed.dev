import Link from "next/link";
import { useState } from "react";
import SearchModal from "./SearchModal";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link href="/">
            <h2>Amazed.DEV</h2>
          </Link>
        </div>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <div onClick={() => setIsOpen(true)} className="search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </nav>
      {isOpen && <SearchModal setIsOpen={setIsOpen} />}
    </header>
  );
}
