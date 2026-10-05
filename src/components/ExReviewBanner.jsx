import { FiArrowUpRight } from "react-icons/fi";
import "./ExReviewBanner.css";

import bannerImage from "../assets/peripherals.png";

const ExReviewBanner = () => {
  return (
    <a href="/ex-review" className="ex-review-banner">
      <div
        className="ex-review-banner__image"
        style={{ backgroundImage: `url(${bannerImage})` }}
      />

      <div className="ex-review-banner__content">
        <div className="ex-review-banner__top">
          <span className="ex-review-banner__eyebrow">PRE-LOVED / 001</span>
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
          <span>VIEW PRE-LOVED GEAR</span>

          <span className="ex-review-banner__arrow">
            <FiArrowUpRight />
          </span>
        </div>
      </div>
    </a>
  );
};

export default ExReviewBanner;
