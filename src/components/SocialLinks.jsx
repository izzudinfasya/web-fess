import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

import { socials } from "../data/links";

import "./sociallinks.css";

const socialData = {
  TikTok: {
    icon: <FaTiktok />,
    value: "14.4K",
    label: "Followers",
  },
  Instagram: {
    icon: <FaInstagram />,
    value: "4K",
    label: "Followers",
  },
};

const SocialLinks = () => {
  return (
    <div className="social-links">
      {socials.map((social) => {
        const data = socialData[social.name];

        if (!data) return null;

        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name} - ${data.value} ${data.label}`}
            className="social-links__item"
          >
            <span className="social-links__icon">{data.icon}</span>

            <span className="social-links__info">
              <span className="social-links__value">{data.value}</span>

              <span className="social-links__label">{data.label}</span>
            </span>
          </a>
        );
      })}

      <a
        href="mailto:izzudinfasya@gmail.com"
        className="social-links__item"
        aria-label="Email for business inquiries"
      >
        <span className="social-links__icon">
          <FiMail />
        </span>

        <span className="social-links__info">
          <span className="social-links__value">Contact</span>

          <span className="social-links__label">Business inquiries</span>
        </span>
      </a>
    </div>
  );
};

export default SocialLinks;
