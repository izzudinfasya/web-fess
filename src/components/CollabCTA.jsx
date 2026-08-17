import { FiArrowUpRight } from "react-icons/fi";
import { featuredLink } from "../data/links";

import "./CollabCTA.css";

const CollabCTA = () => {
  return (
    <section className="collab-cta">
      <div className="collab-cta__content">
        <span className="collab-cta__label">LET'S WORK TOGETHER</span>

        <h2>Work With Me</h2>

        <p>Interested in collaborating? Let's create something great.</p>
      </div>

      <div className="collab-cta__actions">
        <a
          href={featuredLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="collab-cta__button collab-cta__button--primary"
        >
          Get In Touch
        </a>

        <a
          href="https://beacons.ai/fesnotyours/mediakit?origin=lib"
          target="_blank"
          rel="noopener noreferrer"
          className="collab-cta__button collab-cta__button--secondary"
        >
          Media Kit
          <FiArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
};

export default CollabCTA;
