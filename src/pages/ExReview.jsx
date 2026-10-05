import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowLeft, FiArrowUpRight, FiCheck } from "react-icons/fi";

import Footer from "../components/Footer";
import "./ExReview.css";
import PageTransition from "../components/PageTransition";
import { exReviewDrops } from "../data/exReview";
import { Link } from "react-router-dom";

const ExReview = ({ theme }) => {
  const [transitionDone, setTransitionDone] = useState(false);

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

  const currentDrops = exReviewDrops.filter((drop) =>
    drop.items.some((item) => item.qty > 0),
  );

  const archivedDrops = exReviewDrops.filter(
    (drop) => drop.status === "SOLD OUT",
  );

  return (
    <>
      <PageTransition
        theme={theme}
        onComplete={() => setTransitionDone(true)}
      />

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

          {/* CURRENT DROPS */}
          {currentDrops.map((drop) => (
            <section className="ex-review__shop" key={drop.id}>
              <div className="ex-review__shop-header">
                <div>
                  <span className="ex-review__eyebrow">CURRENT RELEASE</span>

                  <h2>DROP #{drop.id}</h2>
                </div>

                <span className="ex-review__shop-count">
                  {String(drop.items.length).padStart(2, "0")} ITEMS
                </span>
              </div>

              <div className="ex-review__grid">
                {drop.items.map((item) => (
                  <article
                    className={`shop-card ${item.qty === 0 ? "shop-card--sold" : ""}`}
                  >
                    <div className="shop-card__image">
                      <img
                        src={item.images[0]}
                        alt={`${item.brand} ${item.name}`}
                      />

                      {item.qty === 0 && (
                        <div className="shop-card__sold-overlay">
                          <span>SOLD OUT</span>
                        </div>
                      )}

                      {item.qty > 0 && (
                        <span className="shop-card__status">
                          <FiCheck />
                          AVAILABLE
                        </span>
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

                        {item.qty > 0 ? (
                          <Link
                            to={`/ex-review/${item.slug}`}
                            className="shop-card__cta"
                          >
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
                ))}
              </div>
            </section>
          ))}

          {/* ARCHIVE */}
          <section className="ex-review__archive-section">
            <div className="ex-review__section-top">
              <div>
                <span className="ex-review__eyebrow">PAST RELEASES</span>

                <h2>DROP ARCHIVE</h2>
              </div>

              <span className="ex-review__archive-count">
                {String(archivedDrops.length).padStart(2, "0")} DROPS
              </span>
            </div>

            {archivedDrops.length > 0 ? (
              <div className="ex-review__archive">
                {archivedDrops.map((drop) => (
                  <a
                    href={`/ex-review/drop/${drop.id}`}
                    className="archive-item"
                    key={drop.id}
                  >
                    <span className="archive-item__drop">#{drop.id}</span>

                    <div className="archive-item__info">
                      <strong>
                        {String(drop.items.length).padStart(2, "0")} /{" "}
                        {String(drop.items.length).padStart(2, "0")} SOLD
                      </strong>

                      <span>{drop.date}</span>
                    </div>

                    <span className="archive-item__status">
                      SOLD OUT
                      <FiArrowUpRight />
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="ex-review__archive-empty">
                <span>NO PAST RELEASES YET.</span>
                <p>The archive will be updated after the first drop.</p>
              </div>
            )}
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default ExReview;
