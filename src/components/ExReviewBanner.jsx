import { FiArrowUpRight } from "react-icons/fi";

import { showToast } from "./toast";
import "./ExReviewBanner.css";

import bannerImage from "../assets/peripherals.png";

const ExReviewBanner = ({ comingSoon = false }) => {
  const handleClick = (e) => {
    if (!comingSoon) return;

    e.preventDefault();

    showToast({
      title: "Coming Soon",
      message: "Pre-loved gear is not available yet. Stay tuned!",
    });
  };

  return (
    <a
      href={comingSoon ? "#" : "/ex-review"}
      className={`ex-review-banner ${
        comingSoon ? "ex-review-banner--coming-soon" : ""
      }`}
      onClick={handleClick}
      aria-disabled={comingSoon}
    >
      <div
        className="ex-review-banner__image"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />

      <div className="ex-review-banner__content">
        <div className="ex-review-banner__top">
          <span className="ex-review-banner__eyebrow">
            {comingSoon ? "COMING SOON" : "PRE-LOVED / 001"}
          </span>
        </div>

        <div className="ex-review-banner__main">
          <div>
            <h2>
              Gear From My Setup.
              <br />
              <span>Reviewed &amp; Used.</span>
            </h2>
          </div>
        </div>

        <div className="ex-review-banner__bottom">
          <span>
            {comingSoon ? "NOT AVAILABLE YET" : "VIEW PRE-LOVED GEAR"}
          </span>

          <span className="ex-review-banner__arrow">
            <FiArrowUpRight />
          </span>
        </div>
      </div>
    </a>
  );
};

export default ExReviewBanner;
