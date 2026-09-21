import Link from "next/link";
import { Language, LanguageSwitcherProps } from "../types";
import { LANGUAGES, LANGUAGE_COOKIE } from "../utils/i18n";

const NAMES: Record<Language, string> = { en: "English", pl: "Polski" };

// The URL is the source of truth; the cookie only remembers the choice for
// visits to language-less addresses such as "/" (handled at the edge).
const rememberLanguage = (lang: Language) => {
  document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  language,
  alternates,
  translations,
}) => (
  <div className="switch" role="group" aria-label="Language">
    {LANGUAGES.map((lang) => {
      const href = alternates[lang];

      if (lang === language) {
        return (
          <span key={lang} className="switch-choice pressed" aria-current="true">
            {lang}
          </span>
        );
      }
      if (!href) {
        return (
          <span
            key={lang}
            className="switch-choice disabled"
            aria-disabled="true"
            title={translations.switcher.unavailable}
          >
            {lang}
          </span>
        );
      }
      return (
        <Link
          key={lang}
          href={href}
          className="switch-choice"
          lang={lang}
          hrefLang={lang}
          aria-label={NAMES[lang]}
          onClick={() => rememberLanguage(lang)}
        >
          {lang}
        </Link>
      );
    })}
  </div>
);

export default LanguageSwitcher;
