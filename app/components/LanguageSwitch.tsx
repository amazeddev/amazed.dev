import { LanguageSwitcherProps } from "../types";

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  toggleLocale,
  language,
}) => {
  return (
    <div>
      <div className="switch" onClick={toggleLocale}>
        <p
          className={
            language === "en" ? "switch-choice pressed" : "switch-choice"
          }
        >
          en
        </p>
        <p
          className={
            language === "pl" ? "switch-choice pressed" : "switch-choice"
          }
        >
          pl
        </p>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
