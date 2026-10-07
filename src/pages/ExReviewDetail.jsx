import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiMessageCircle,
  FiShoppingBag,
} from "react-icons/fi";

import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { showToast } from "../components/toast";
import { exReviewDrops } from "../data/exReview";

import "./ExReviewDetail.css";

const ExReviewDetail = ({ theme }) => {
  const { slug } = useParams();

  const [transitionDone, setTransitionDone] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const product = exReviewDrops
    .flatMap((drop) => drop.items)
    .find((item) => item.slug === slug);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!transitionDone) return;

    document.title = product
      ? `${product.brand} ${product.name} — Ex-Review`
      : "Ex-Review";

    return () => {
      document.title = "fesnotyours";
    };
  }, [transitionDone, product]);

  if (!product) {
    return (
      <>
        <PageTransition
          theme={theme}
          onComplete={() => setTransitionDone(true)}
        />

        <main className="ex-detail">
          <div className="ex-detail__container">
            <nav className="ex-detail__nav">
              <Link to="/ex-review" className="ex-detail__back">
                <FiArrowLeft />
                <span>BACK TO EX-REVIEW</span>
              </Link>
            </nav>

            <div className="ex-detail__not-found">
              <span>404</span>
              <h1>ITEM NOT FOUND</h1>
              <p>This item may have been removed from the collection.</p>

              <Link to="/ex-review" className="ex-detail__return">
                BACK TO SHOP
                <FiArrowUpRight />
              </Link>
            </div>

            <Footer />
          </div>
        </main>
      </>
    );
  }

  const images = product.images?.length ? product.images : [product.image];

  const isSold = product.status === "SOLD OUT";
  const isBooked = product.status === "BOOKED";

  const nextImage = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  const prevImage = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const openImage = () => {
    setIsImageOpen(true);
  };

  const closeImage = () => {
    setIsImageOpen(false);
  };

  // =========================================================
  // BOOKED TOAST
  // =========================================================

  const handleBookedClick = (event) => {
    if (!isBooked) return;

    event.preventDefault();

    showToast({
      title: "Already Booked",
      message: "This item has already been booked by someone else.",
    });
  };

  // =========================================================
  // SWIPE HANDLER
  // =========================================================

  const handleTouchStart = (event) => {
    event.currentTarget.dataset.touchStartX = event.touches[0].clientX;
    event.currentTarget.dataset.touchStartY = event.touches[0].clientY;
  };

  const handleTouchEnd = (event, shouldOpen = false) => {
    const startX = Number(event.currentTarget.dataset.touchStartX);
    const startY = Number(event.currentTarget.dataset.touchStartY);

    if (!startX && !startY) return;

    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    const minSwipeDistance = 50;

    // Horizontal swipe only
    if (
      Math.abs(diffX) > minSwipeDistance &&
      Math.abs(diffX) > Math.abs(diffY)
    ) {
      if (diffX < 0) {
        nextImage();
      } else {
        prevImage();
      }

      return;
    }

    // If it wasn't a swipe, treat it as a normal click
    if (shouldOpen && Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
      openImage();
    }
  };

  return (
    <>
      <PageTransition
        theme={theme}
        onComplete={() => setTransitionDone(true)}
      />

      <main className="ex-detail">
        <div className="ex-detail__noise" />

        <div className="ex-detail__container">
          {/* HEADER */}
          <nav className="ex-detail__nav">
            <Link to="/ex-review" className="ex-detail__back">
              <FiArrowLeft />
              <span>BACK TO EX-REVIEW</span>
            </Link>

            <span className="ex-detail__nav-label">
              PRE-LOVED / {product.type}
            </span>
          </nav>

          {/* PRODUCT */}
          <section className="ex-detail__product">
            {/* IMAGE SIDE */}
            <div className="ex-detail__visual">
              <div
                className="ex-detail__image"
                onClick={(event) => {
                  if (event.target.closest("button")) return;

                  openImage();
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openImage();
                  }
                }}
              >
                <img
                  src={images[activeImage]}
                  alt={`${product.brand} ${product.name}`}
                />

                <div className="ex-detail__image-number">
                  {String(activeImage + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </div>

                {isSold && (
                  <div className="ex-detail__sold">
                    <span>SOLD OUT</span>
                  </div>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="ex-detail__arrow ex-detail__arrow--prev"
                      onClick={(event) => {
                        event.stopPropagation();
                        prevImage();
                      }}
                      aria-label="Previous image"
                    >
                      <FiChevronLeft />
                    </button>

                    <button
                      type="button"
                      className="ex-detail__arrow ex-detail__arrow--next"
                      onClick={(event) => {
                        event.stopPropagation();
                        nextImage();
                      }}
                      aria-label="Next image"
                    >
                      <FiChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* THUMBNAILS */}
              {images.length > 1 && (
                <div className="ex-detail__thumbs">
                  {images.map((image, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`ex-detail__thumb ${
                        activeImage === index ? "ex-detail__thumb--active" : ""
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* LIGHTBOX */}
              {isImageOpen && (
                <div
                  className="ex-detail__lightbox"
                  onClick={closeImage}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(event) => handleTouchEnd(event, false)}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${product.brand} ${product.name} image viewer`}
                >
                  <button
                    type="button"
                    className="ex-detail__lightbox-close"
                    onClick={closeImage}
                    aria-label="Close image"
                  >
                    ×
                  </button>

                  {images.length > 1 && (
                    <button
                      type="button"
                      className="ex-detail__lightbox-arrow ex-detail__lightbox-arrow--prev"
                      onClick={(event) => {
                        event.stopPropagation();
                        prevImage();
                      }}
                      aria-label="Previous image"
                    >
                      <FiChevronLeft />
                    </button>
                  )}

                  <img
                    src={images[activeImage]}
                    alt={`${product.brand} ${product.name}`}
                    className="ex-detail__lightbox-image"
                    onClick={(event) => event.stopPropagation()}
                  />

                  {images.length > 1 && (
                    <button
                      type="button"
                      className="ex-detail__lightbox-arrow ex-detail__lightbox-arrow--next"
                      onClick={(event) => {
                        event.stopPropagation();
                        nextImage();
                      }}
                      aria-label="Next image"
                    >
                      <FiChevronRight />
                    </button>
                  )}

                  <div className="ex-detail__lightbox-count">
                    {String(activeImage + 1).padStart(2, "0")} /{" "}
                    {String(images.length).padStart(2, "0")}
                  </div>
                </div>
              )}
            </div>

            {/* INFO SIDE */}
            <div className="ex-detail__info">
              <div className="ex-detail__heading">
                <div className="ex-detail__eyebrow">
                  <span>{product.type}</span>

                  <span className="ex-detail__dot" />

                  <span>{product.category}</span>
                </div>

                <span className="ex-detail__id">ITEM / {product.id}</span>
              </div>

              <div className="ex-detail__title">
                <span>{product.brand}</span>

                <h1>{product.name}</h1>
              </div>

              <div className="ex-detail__price">
                <span>PRE-LOVED PRICE</span>
                <strong>{product.price}</strong>
              </div>

              {/* META */}
              <div className="ex-detail__meta">
                <div>
                  <span>CONDITION</span>
                  <strong>{product.condition}</strong>
                </div>

                <div>
                  <span>USED FOR</span>
                  <strong>{product.usedFor}</strong>
                </div>

                <div>
                  <span>INCLUDED</span>
                  <strong>{product.included}</strong>
                </div>

                <div>
                  <span>AVAILABILITY</span>
                  <strong
                    className={isSold ? "is-sold" : isBooked ? "is-booked" : ""}
                  >
                    {isSold ? "SOLD OUT" : isBooked ? "BOOKED" : "AVAILABLE"}
                  </strong>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="ex-detail__description">
                <span className="ex-detail__label">NOTES</span>

                <p>
                  Sebelum aku jual, barangnya udah aku cek dan tes lagi. Untuk
                  kondisi, bisa langsung lihat dari foto yang ada yaa.
                </p>
              </div>

              {/* REVIEW */}
              {product.reviewUrl && (
                <a
                  href={product.reviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ex-detail__review-btn"
                >
                  <span>WATCH REVIEW</span>
                  <FiArrowUpRight />
                </a>
              )}

              {/* CTA */}
              {!isSold ? (
                <div className="ex-detail__actions">
                  <a
                    href={isBooked ? undefined : product.whatsapp}
                    target={isBooked ? undefined : "_blank"}
                    rel={isBooked ? undefined : "noreferrer"}
                    onClick={handleBookedClick}
                    className="ex-detail__action ex-detail__action--checkout"
                  >
                    <FiMessageCircle />

                    <span className="ex-detail__action-content">
                      <strong>DIRECT BUY</strong>
                      <small>SHIPPING INCLUDED</small>
                    </span>
                  </a>

                  <a
                    href={isBooked ? undefined : product.shopee}
                    target={isBooked ? undefined : "_blank"}
                    rel={isBooked ? undefined : "noreferrer"}
                    onClick={handleBookedClick}
                    className="ex-detail__action ex-detail__action--shopee"
                  >
                    <FiShoppingBag />
                    <span>BUY VIA SHOPEE</span>
                  </a>
                </div>
              ) : (
                <div className="ex-detail__sold-button">SOLD OUT</div>
              )}
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default ExReviewDetail;
