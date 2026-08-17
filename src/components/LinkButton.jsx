import { FiArrowUpRight } from "react-icons/fi";

import "./LinkButton.css";

const LinkButton = ({ title, url, featured = false }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-button ${featured ? "link-button--featured" : ""}`}
    >
      {featured ? (
        <>
          <div className="featured-content">
            <span className="featured-label">For Brands & Collaborations</span>

            <span className="featured-title">{title}</span>
          </div>

          <span className="featured-arrow">
            <FiArrowUpRight />
          </span>
        </>
      ) : (
        <>
          <span>{title}</span>

          <FiArrowUpRight />
        </>
      )}
    </a>
  );
};

export default LinkButton;
