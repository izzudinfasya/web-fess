import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PersonalHub.css";

import Profile from "../components/Profile";
import SocialLinks from "../components/SocialLinks";
import CollabCTA from "../components/CollabCTA";
import ExclusiveDiscount from "../components/ExclusiveDiscount";
import ExReviewBanner from "../components/ExReviewBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import LinkButton from "../components/LinkButton";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

import { links } from "../data/links";

const PersonalHub = ({ theme }) => {
  const [transitionDone, setTransitionDone] = useState(false);
  const [activeCTA, setActiveCTA] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    if (transitionDone) {
      AOS.init({
        duration: 350,
        easing: "ease-out",
        once: true,
        offset: 0,
      });

      AOS.refreshHard();
    }
  }, [transitionDone]);

  /* =========================
     AUTO SLIDER
  ========================= */

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveCTA((current) => (current === 0 ? 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, activeCTA]);

  /* =========================
     MANUAL SLIDE
  ========================= */

  const goToSlide = (index) => {
    setActiveCTA(index);
  };

  const toggleSlide = () => {
    setActiveCTA((current) => (current === 0 ? 1 : 0));
  };

  /* =========================
     TOUCH / SWIPE
  ========================= */

  const handleTouchStart = (e) => {
    setIsPaused(true);

    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      toggleSlide();
    }

    /*
      Sedikit delay supaya setelah finger dilepas
      slider tidak langsung auto-switch.
    */
    setTimeout(() => {
      setIsPaused(false);
    }, 100);
  };

  /* =========================
     MOUSE / DESKTOP
  ========================= */

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <main className="page">
      <PageTransition
        theme={theme}
        onComplete={() => setTransitionDone(true)}
      />

      <div className="container">
        <div data-aos="fade-up">
          <Profile />
        </div>

        <div data-aos="fade-up" data-aos-delay="40">
          <SocialLinks />
        </div>

        {/* CTA SLIDER */}
        <div data-aos="fade-up" data-aos-delay="80">
          <div className="home-cta-slider">
            <div
              className="home-cta-slider__viewport"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="home-cta-slider__track"
                style={{
                  transform: `translateX(-${activeCTA * 50}%)`,
                }}
              >
                <div className="home-cta-slider__item">
                  <CollabCTA />
                </div>

                <div className="home-cta-slider__item">
                  <ExReviewBanner />
                </div>
              </div>
            </div>

            {/* DOTS */}
            <div className="home-cta-slider__dots">
              <button
                type="button"
                aria-label="Show collaboration"
                onClick={() => goToSlide(0)}
                style={{
                  width: activeCTA === 0 ? "16px" : "5px",
                  height: "5px",
                  minWidth: activeCTA === 0 ? "16px" : "5px",
                  padding: 0,
                  margin: 0,
                  border: 0,
                  borderRadius: "999px",
                  background: activeCTA === 0 ? "var(--text)" : "var(--muted)",
                  opacity: activeCTA === 0 ? 1 : 0.3,
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                  transition:
                    "width 0.25s ease, min-width 0.25s ease, opacity 0.25s ease, background 0.25s ease",
                }}
              />

              <button
                type="button"
                aria-label="Show pre-loved gear"
                onClick={() => goToSlide(1)}
                style={{
                  width: activeCTA === 1 ? "16px" : "5px",
                  height: "5px",
                  minWidth: activeCTA === 1 ? "16px" : "5px",
                  padding: 0,
                  margin: 0,
                  border: 0,
                  borderRadius: "999px",
                  background: activeCTA === 1 ? "var(--text)" : "var(--muted)",
                  opacity: activeCTA === 1 ? 1 : 0.3,
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                  transition:
                    "width 0.25s ease, min-width 0.25s ease, opacity 0.25s ease, background 0.25s ease",
                }}
              />
            </div>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="120">
          <ExclusiveDiscount />
        </div>

        <div data-aos="fade-up" data-aos-delay="160">
          <FeaturedProducts />
        </div>

        <section className="links" data-aos="fade-up" data-aos-delay="200">
          {links.map((link) => (
            <LinkButton key={link.title} title={link.title} url={link.url} />
          ))}
        </section>

        <div data-aos="fade-up" data-aos-delay="240">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default PersonalHub;
