import { FiArrowUpRight } from "react-icons/fi";
import "./ReactSetupBanner.css";

const ReactSetupBanner = () => {
  return (
    <a
      href="https://docs.google.com/forms/d/1XT085WzGhas_oPSdtBIgdWCTTawwpJOPohzY2sbSvuc/viewform"
      target="_blank"
      rel="noopener noreferrer"
      className="react-setup-banner"
    >
      <div className="react-setup-banner__bg">
        <span className="react-setup-banner__circle" />
        <span className="react-setup-banner__line line-1" />
        <span className="react-setup-banner__line line-2" />
      </div>

      <div className="react-setup-banner__content">
        <div className="react-setup-banner__top">
          <span>REACT SETUP</span>
        </div>

        <div className="react-setup-banner__headline">
          <span>SHOW ME</span>
          <strong>YOUR SETUP.</strong>
        </div>

        <p className="react-setup-banner__description">
          Send a photo of your setup and get a chance to be featured.
        </p>

        <div className="react-setup-banner__cta">
          <span>SUBMIT YOUR SETUP</span>

          <span className="react-setup-banner__arrow">
            <FiArrowUpRight />
          </span>
        </div>
      </div>

      <div className="react-setup-banner__visual">
        <div className="react-setup-banner__image">
          <div className="react-setup-banner__image-overlay" />

          <span className="react-setup-banner__image-text">
            SEND YOUR
            <br />
            SETUP PIC
          </span>
        </div>
      </div>
    </a>
  );
};

export default ReactSetupBanner;
