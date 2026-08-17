import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./PageTransition.css";

const PageTransition = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Always start the page from the top
    window.scrollTo(0, 0);

    const leaveTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 1200);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1700);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`page-transition ${
        isLeaving ? "page-transition--leaving" : ""
      }`}
    >
      <div className="page-transition__content">
        <div className="page-transition__logo">
          <img src={logo} alt="Fess" />
        </div>

        <span className="page-transition__line" />

        <p className="page-transition__quote">
          Curious by nature.
          <br />
          Intentional by design.
        </p>

        <span className="page-transition__signature">FESS / 2026</span>
      </div>
    </div>
  );
};

export default PageTransition;
