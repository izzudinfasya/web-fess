import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PersonalHub.css";

import Profile from "../components/Profile";
import SocialLinks from "../components/SocialLinks";
import CollabCTA from "../components/CollabCTA";
import ExclusiveDiscount from "../components/ExclusiveDiscount";
import ExReviewBanner from "../components/ExReviewBanner";
import ReactSetupBanner from "../components/ReactSetupBanner";
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

  const totalSlides = 3;

  /* =========================
     AOS
  ========================= */

  useEffect(() => {
    if (!transitionDone) return;

    AOS.init({
      duration: 350,
      easing: "ease-out",
      once: true,
      offset: 0,
      disable: false,
    });

    AOS.refresh();

    return () => {
      AOS.refreshHard();
    };
  }, [transitionDone]);

  /* =========================
     AUTO SLIDER
  ========================= */

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveCTA((current) => (current + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  /* =========================
     MANUAL SLIDE
  ========================= */

  const goToSlide = (index) => {
    setActiveCTA(index);
  };

  const toggleSlide = (direction) => {
    setActiveCTA((current) => {
      if (direction === "next") {
        return (current + 1) % totalSlides;
      }

      return (current - 1 + totalSlides) % totalSlides;
    });
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
      if (distance > 0) {
        // Swipe left
        toggleSlide("next");
      } else {
        // Swipe right
        toggleSlide("prev");
      }
    }

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
        {/* PROFILE */}
        <div data-aos="fade-up">
          <Profile />
        </div>

        {/* SOCIAL LINKS */}
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
                  transform: `translate3d(-${activeCTA * 33.333333}%, 0, 0)`,
                }}
              >
                {/* SLIDE 01 */}
                <div className="home-cta-slider__item">
                  <CollabCTA />
                </div>

                {/* SLIDE 02 */}
                <div className="home-cta-slider__item">
                  <ExReviewBanner />
                </div>

                {/* SLIDE 03 */}
                <div className="home-cta-slider__item">
                  <ReactSetupBanner />
                </div>
              </div>
            </div>

            {/* DOTS */}
            <div className="home-cta-slider__dots">
              {[
                {
                  label: "Show collaboration",
                },
                {
                  label: "Show pre-loved gear",
                },
                {
                  label: "Show React setup",
                },
              ].map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  aria-label={slide.label}
                  onClick={() => goToSlide(index)}
                  className={activeCTA === index ? "active" : ""}
                />
              ))}
            </div>
          </div>
        </div>

        {/* EXCLUSIVE DISCOUNT */}
        <div data-aos="fade-up" data-aos-delay="120">
          <ExclusiveDiscount />
        </div>

        {/* FEATURED PRODUCTS */}
        <div data-aos="fade-up" data-aos-delay="160">
          <FeaturedProducts />
        </div>

        {/* LINKS */}
        <section className="links" data-aos="fade-up" data-aos-delay="200">
          {links.map((link) => (
            <LinkButton
              key={link.title}
              title={link.title}
              url={link.url}
              id={link.title === "React Setup" ? "react-setup" : undefined}
            />
          ))}
        </section>

        {/* FOOTER */}
        <div data-aos="fade-up" data-aos-delay="240">
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default PersonalHub;
