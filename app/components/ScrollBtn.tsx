import React, { useState, useEffect } from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ScrollButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 200) {
        setVisible(true);
      } else if (scrolled <= 200) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  return (
    <div
      className="scroll-btn"
      style={{ display: visible ? "inline" : "none" }}
    >
      <FontAwesomeIcon icon={faChevronUp as any} onClick={scrollToTop} />
    </div>
  );
};

export default ScrollButton;
