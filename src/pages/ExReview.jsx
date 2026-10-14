import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiMaximize2,
} from "react-icons/fi";

import Footer from "../components/Footer";
import "./ExReview.css";
import PageTransition from "../components/PageTransition";
import { exReviewDrops } from "../data/exReview";
import { Link } from "react-router-dom";
import exReviewTestimonials from "../data/exReviewTestimonials";
import AnnouncementMarquee from "../components/AnnouncementMarquee";
import FAQAccordion from "../components/FAQAccordion";

const ExReview = ({ theme }) => {
  const [transitionDone, setTransitionDone] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const [showSoldItems, setShowSoldItems] = useState(false);

  const testimonialTrackRef = useRef(null);

  // Pisahkan barang yang masih tersedia/booked dan yang sudah terjual.
  const currentDrops = exReviewDrops
    .map((drop) => ({
      ...drop,
      items: drop.items.filter((item) => item.status !== "SOLD OUT"),
    }))
    .filter((drop) => drop.items.length > 0);

  const soldItems = exReviewDrops.flatMap((drop) =>
    drop.items
      .filter((item) => item.status === "SOLD OUT")
      .map((item) => ({
        ...item,
        dropId: drop.id,
      })),
  );

  // Satu objek testimonial mewakili satu buyer/transaksi.
  // Foto produk, chat, dan kutipan tetap menjadi satu review.
  const availableTestimonials = exReviewTestimonials.filter(
    (testimonial) =>
      testimonial.productImage || testimonial.chatImage || testimonial.quote,
  );

  const activeIndex = availableTestimonials.findIndex(
    (testimonial) => testimonial.id === activeTestimonial,
  );

  const activeImage =
    activeIndex >= 0 ? availableTestimonials[activeIndex] : null;

  // Geser slider berdasarkan lebar satu kartu testimonial.
  const scrollTestimonials = (direction) => {
    const track = testimonialTrackRef.current;
    if (!track) return;

    const firstItem = track.querySelector(".ex-review__testimonial");
    if (!firstItem) return;

    const itemWidth = firstItem.getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    track.scrollBy({
      left: direction * (itemWidth + gap),
      behavior: "smooth",
    });
  };

  const closeTestimonialLightbox = () => {
    setActiveTestimonial(null);
  };

  const showPreviousTestimonial = () => {
    if (availableTestimonials.length < 2 || activeIndex < 0) return;

    const previousIndex =
      (activeIndex - 1 + availableTestimonials.length) %
      availableTestimonials.length;

    setActiveTestimonial(availableTestimonials[previousIndex].id);
  };

  const showNextTestimonial = () => {
    if (availableTestimonials.length < 2 || activeIndex < 0) return;

    const nextIndex = (activeIndex + 1) % availableTestimonials.length;

    setActiveTestimonial(availableTestimonials[nextIndex].id);
  };

  // Reset scroll restoration dan posisi halaman.
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  // Update judul tab browser.
  useEffect(() => {
    document.title = "Ex-Review — Pre-Loved Gear";

    return () => {
      document.title = "fesnotyours";
    };
  }, []);

  // Inisialisasi AOS setelah page transition selesai.
  useEffect(() => {
    if (!transitionDone) return;

    AOS.init({
      duration: 350,
      easing: "ease-out",
      once: true,
      offset: 0,
    });

    AOS.refreshHard();
  }, [transitionDone]);

  // Keyboard navigation dan scroll lock selama lightbox terbuka.
  useEffect(() => {
    if (activeTestimonial === null || !activeImage) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeTestimonialLightbox();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPreviousTestimonial();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNextTestimonial();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTestimonial, activeIndex, availableTestimonials.length]);

  // Komponen kartu produk untuk katalog utama dan sold items.
  const renderProductCard = (item) => {
    const isAvailable = item.status === "AVAILABLE";
    const isBooked = item.status === "BOOKED";
    const isSold = item.status === "SOLD OUT";

    return (
      <article
        key={item.slug}
        className={`shop-card ${isSold ? "shop-card--sold" : ""}`}
      >
        <div className="shop-card__image">
          <img
            src={item.images[0]}
            alt={`${item.brand} ${item.name}`}
            loading="lazy"
            decoding="async"
          />

          {isSold && (
            <div className="shop-card__sold-overlay">
              <span>SOLD OUT</span>
            </div>
          )}

          {isAvailable && (
            <span className="shop-card__status">
              <FiCheck />
              AVAILABLE
            </span>
          )}

          {isBooked && (
            <div className="shop-card__booked-overlay">
              <span>BOOKED</span>
            </div>
          )}

          <span className="shop-card__number">{item.id}</span>
        </div>

        <div className="shop-card__content">
          <div className="shop-card__top">
            <span className="shop-card__brand">{item.brand}</span>
            <span className="shop-card__type">{item.type}</span>
          </div>

          <h3>{item.name}</h3>

          <div className="shop-card__footer">
            <div className="shop-card__price">
              <span>PRICE</span>
              <strong>{item.price}</strong>
            </div>

            {!isSold ? (
              <Link to={`/ex-review/${item.slug}`} className="shop-card__cta">
                CHECK DETAIL
                <FiArrowUpRight />
              </Link>
            ) : (
              <span className="shop-card__cta shop-card__cta--sold">
                SOLD OUT
              </span>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <>
      <PageTransition
        theme={theme}
        onComplete={() => setTransitionDone(true)}
      />

      <AnnouncementMarquee />

      <main className="ex-review">
        <div className="ex-review__noise" />

        <div className="ex-review__container">
          {/* TOP BAR */}
          <nav className="ex-review__nav">
            <a href="/" className="ex-review__back">
              <FiArrowLeft />
              <span>BACK</span>
            </a>

            <span className="ex-review__nav-label">PRE-LOVED / 2026</span>
          </nav>

          {/* AVAILABLE & BOOKED ITEMS */}
          {currentDrops.map((drop) => (
            <section className="ex-review__shop" key={drop.id}>
              <div className="ex-review__shop-header">
                <div>
                  <span className="ex-review__eyebrow">CURRENT RELEASE</span>
                  <h2>DROP #{drop.id}</h2>
                </div>

                <a
                  href="https://wa.me/6285179583850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ex-review__shop-count ex-review__ask-admin"
                >
                  CHAT ADMIN
                  <FiArrowUpRight />
                </a>
              </div>

              <div className="ex-review__grid">
                {drop.items.map((item) => renderProductCard(item))}
              </div>
            </section>
          ))}

          {/* SOLD ITEMS */}
          {soldItems.length > 0 && (
            <section className="ex-review__sold">
              <button
                type="button"
                className="ex-review__sold-toggle"
                onClick={() => setShowSoldItems((prev) => !prev)}
                aria-expanded={showSoldItems}
              >
                <span>
                  {showSoldItems ? "HIDE SOLD ITEMS" : "VIEW SOLD ITEMS"}
                </span>

                <span className="ex-review__sold-count">
                  {String(soldItems.length).padStart(2, "0")} ITEMS
                </span>

                {showSoldItems ? <FiX /> : <FiArrowUpRight />}
              </button>

              {showSoldItems && (
                <div className="ex-review__sold-content">
                  <div className="ex-review__sold-heading">
                    <span className="ex-review__eyebrow">
                      NO LONGER AVAILABLE
                    </span>

                    <h2>
                      SOLD ITEMS<span>.</span>
                    </h2>
                  </div>

                  <div className="ex-review__grid">
                    {soldItems.map((item) => renderProductCard(item))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* TESTIMONIALS */}
          <section className="ex-review__testimonials">
            <div className="ex-review__section-top">
              <div>
                <span className="ex-review__eyebrow">BUYER FEEDBACK</span>

                <h2>
                  REAL REVIEWS<span>.</span>
                </h2>
              </div>

              <span className="ex-review__testimonial-count">
                {String(availableTestimonials.length).padStart(2, "0")} REVIEWS
              </span>
            </div>

            {/* HORIZONTAL TESTIMONIAL SLIDER */}
            <div className="ex-review__slider-wrapper">
              <div
                className="ex-review__testimonial-slider"
                ref={testimonialTrackRef}
              >
                <div className="ex-review__testimonial-track">
                  {availableTestimonials.map((testimonial) => (
                    <button
                      type="button"
                      className="ex-review__testimonial is-clickable"
                      key={testimonial.id}
                      onClick={() => setActiveTestimonial(testimonial.id)}
                      aria-label={`View buyer review ${testimonial.id}`}
                    >
                      {/* PRODUCT PHOTO */}
                      <div className="ex-review__review-media">
                        {testimonial.productImage ? (
                          <img
                            src={testimonial.productImage}
                            alt={
                              testimonial.alt ||
                              `${
                                testimonial.productName || "Product"
                              } received by buyer`
                            }
                            className="ex-review__testimonial-image"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="ex-review__review-no-image">
                            <span>PRODUCT PHOTO</span>
                            <span>NOT AVAILABLE</span>
                          </div>
                        )}

                        <span className="ex-review__review-label">
                          PRODUCT RECEIVED
                        </span>

                        <span
                          className="ex-review__testimonial-zoom"
                          aria-hidden="true"
                        >
                          <FiMaximize2 />
                        </span>
                      </div>

                      {/* BUYER QUOTE */}
                      <div className="ex-review__review-info">
                        <div className="ex-review__review-meta">
                          <span>
                            / {String(testimonial.id).padStart(2, "0")}
                          </span>

                          <span>BUYER REVIEW</span>
                        </div>

                        {testimonial.productName && (
                          <h3 className="ex-review__review-product">
                            {testimonial.productName}
                          </h3>
                        )}

                        {testimonial.quote && (
                          <blockquote className="ex-review__review-quote">
                            “{testimonial.quote}”
                          </blockquote>
                        )}

                        <span className="ex-review__review-open">
                          VIEW FULL REVIEW
                          <FiArrowUpRight />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SLIDER CONTROLS */}
              <div className="ex-review__slider-controls">
                <span className="ex-review__slider-hint">DRAG TO EXPLORE</span>

                <div className="ex-review__slider-arrows">
                  <button
                    type="button"
                    className="ex-review__slider-arrow"
                    onClick={() => scrollTestimonials(-1)}
                    aria-label="Scroll to previous reviews"
                  >
                    <FiChevronLeft />
                  </button>

                  <button
                    type="button"
                    className="ex-review__slider-arrow"
                    onClick={() => scrollTestimonials(1)}
                    aria-label="Scroll to next reviews"
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQAccordion />

          {/* FOOTER */}
          <Footer />
        </div>
      </main>

      {/* TESTIMONIAL LIGHTBOX */}
      {activeImage && (
        <div
          className="ex-review__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Buyer review details"
          onClick={closeTestimonialLightbox}
        >
          <button
            type="button"
            className="ex-review__lightbox-close"
            onClick={closeTestimonialLightbox}
            aria-label="Close review"
          >
            <FiX />
          </button>

          {/* PREVIOUS / NEXT BUYER */}
          {availableTestimonials.length > 1 && (
            <>
              <button
                type="button"
                className="ex-review__lightbox-arrow ex-review__lightbox-prev"
                onClick={(event) => {
                  event.stopPropagation();
                  showPreviousTestimonial();
                }}
                aria-label="Previous buyer review"
              >
                <FiChevronLeft />
              </button>

              <button
                type="button"
                className="ex-review__lightbox-arrow ex-review__lightbox-next"
                onClick={(event) => {
                  event.stopPropagation();
                  showNextTestimonial();
                }}
                aria-label="Next buyer review"
              >
                <FiChevronRight />
              </button>
            </>
          )}

          <div
            className="ex-review__lightbox-content ex-review__review-detail"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="ex-review__review-detail-header">
              <span className="ex-review__eyebrow">
                BUYER REVIEW / {String(activeImage.id).padStart(2, "0")}
              </span>

              <h2>
                {activeImage.productName || "PRODUCT REVIEW"}
                <span>.</span>
              </h2>
            </div>

            {/* ORIGINAL BUYER QUOTE */}
            {activeImage.quote && (
              <blockquote className="ex-review__detail-quote">
                “{activeImage.quote}”
              </blockquote>
            )}

            {/* PRODUCT PHOTO + WHATSAPP SCREENSHOT
                Both assets belong to the same buyer review. */}
            <div className="ex-review__detail-gallery">
              {activeImage.productImage && (
                <figure className="ex-review__detail-item">
                  <figcaption>01 / PRODUCT RECEIVED</figcaption>

                  <img
                    src={activeImage.productImage}
                    alt={
                      activeImage.alt ||
                      `${
                        activeImage.productName || "Product"
                      } received by buyer`
                    }
                    className="ex-review__lightbox-image"
                    decoding="async"
                  />
                </figure>
              )}

              {activeImage.chatImage && (
                <figure className="ex-review__detail-item">
                  <figcaption>02 / WHATSAPP FEEDBACK</figcaption>

                  <img
                    src={activeImage.chatImage}
                    alt={`WhatsApp feedback for buyer review ${activeImage.id}`}
                    className="ex-review__lightbox-image"
                    decoding="async"
                  />
                </figure>
              )}
            </div>

            <span className="ex-review__lightbox-counter">
              {String(activeIndex + 1).padStart(2, "0")}
              {" / "}
              {String(availableTestimonials.length).padStart(2, "0")}
              {" BUYERS"}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ExReview;
