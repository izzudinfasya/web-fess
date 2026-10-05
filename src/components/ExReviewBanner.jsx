import { FiArrowUpRight } from "react-icons/fi";
import "./ExReviewBanner.css";

const ExReviewBanner = () => {
  return (
    <a href="/ex-review" className="ex-review-banner">
      <div className="ex-review-banner__content">
        <div className="ex-review-banner__top">
          <span className="ex-review-banner__eyebrow">PRE-LOVED / 001</span>

          <span className="ex-review-banner__status">AVAILABLE</span>
        </div>

        <div className="ex-review-banner__main">
          <div>
            <h2>
              Previously mine.
              <br />
              <span>Now Yours.</span>
            </h2>
          </div>

          <div className="ex-review-banner__info">
            <span>GEAR FROM MY SETUP</span>
            <span>REVIEWED &amp; USED</span>
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
