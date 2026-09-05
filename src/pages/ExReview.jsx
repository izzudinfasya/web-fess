import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiArrowLeft, FiArrowUpRight, FiCheck } from "react-icons/fi";

import Footer from "../components/Footer";
import "./ExReview.css";
import PageTransition from "../components/PageTransition";

const preLovedItems = [
  {
    id: "01",
    brand: "ROYAL KLUDGE",
    name: "R65",
    category: "MECHANICAL KEYBOARD",
    type: "EX-REVIEW",
    usedFor: "Used for review",
    price: "Rp650.000",
    details: "Condition 9/10 · Original box · Full accessories",
    image: "/ex-review/royal-kludge-r65.jpg",
    reviewUrl: "#",
    buyUrl: "#",
  },
  {
    id: "02",
    brand: "VXE DRAGONFLY",
    name: "V3 PRO",
    category: "WIRELESS MOUSE",
    type: "PERSONAL",
    usedFor: "Used for 6 months",
    price: "Rp450.000",
    details: "Condition 9/10 · Original box · Full accessories",
    image: "/ex-review/vxe-dragonfly-v3-pro.jpg",
    reviewUrl: "#",
    buyUrl: "#",
  },
  {
    id: "03",
    brand: "AJAZZ",
    name: "AK820 PRO",
    category: "MECHANICAL KEYBOARD",
    type: "EX-REVIEW",
    usedFor: "Used for review",
    price: "Rp550.000",
    details: "Condition 9/10 · Original box · Full accessories",
    image: "/ex-review/ajazz-ak820-pro.jpg",
    reviewUrl: "#",
    buyUrl: "#",
  },
  {
    id: "04",
    brand: "MAONO",
    name: "PD100X",
    category: "USB MICROPHONE",
    type: "EX-REVIEW",
    usedFor: "Used for review",
    price: "Rp600.000",
    details: "Condition 9/10 · Original box · Full accessories",
    image: "/ex-review/maono-pd100x.jpg",
    reviewUrl: "#",
    buyUrl: "#",
  },
  {
    id: "05",
    brand: "PRESSPLAY",
    name: "SPIRIT",
    category: "WIRELESS MOUSE",
    type: "PERSONAL",
    usedFor: "Used for 4 months",
    price: "Rp350.000",
    details: "Condition 8.5/10 · Original box · Full accessories",
    image: "/ex-review/pressplay-spirit.jpg",
    reviewUrl: "#",
    buyUrl: "#",
  },
];

const process = [
  {
    number: "01",
    title: "REVIEW",
    description: "Tested and documented.",
  },
  {
    number: "02",
    title: "USE",
    description: "Used in my own setup.",
  },
  {
    number: "03",
    title: "DROP",
    description: "Listed when it's time to move on.",
  },
  {
    number: "04",
    title: "REHOME",
    description: "Passed on to another desk.",
  },
];

const archive = [
  {
    drop: "#000",
    sold: "06 / 06 SOLD",
    date: "AUG 2026",
  },
  {
    drop: "#001",
    sold: "05 / 05 SOLD",
    date: "JUL 2026",
  },
  {
    drop: "#002",
    sold: "07 / 07 SOLD",
    date: "JUN 2026",
  },
];

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

          {/* HERO */}
          <header className="ex-review__hero">
            <h1>
              Previously
              <br />
              <span>mine.</span>
            </h1>

            <div className="ex-review__hero-bottom">
              <p>
                Gear I've reviewed, lived with,
                <br className="desktop-only" />
                and decided to pass on.
              </p>

              <span className="ex-review__scroll">
                SCROLL TO EXPLORE
                <span>↓</span>
              </span>
            </div>
          </header>

          {/* CURRENT DROP */}
          <section className="ex-review__drop">
            <div className="ex-review__section-top">
              <div>
                <span className="ex-review__eyebrow">CURRENT RELEASE</span>

                <div className="ex-review__drop-title">
                  <h2>DROP 001</h2>

                  <span>LIVE</span>
                </div>
              </div>

              <div className="ex-review__drop-meta">
                <span>AUGUST 2026</span>
                <strong>
                  {String(preLovedItems.length).padStart(2, "0")} PIECES
                </strong>
              </div>
            </div>

            <div className="ex-review__products">
              {preLovedItems.map((item) => (
                <article className="product" key={item.id}>
                  <div className="product__number">{item.id}</div>

                  <div className="product__visual">
                    <div className="product__image">
                      <img
                        src={item.image}
                        alt={`${item.brand} ${item.name}`}
                      />
                    </div>

                    <span className="product__status">
                      <FiCheck />
                      AVAILABLE
                    </span>

                    <span className="product__visual-category">
                      {item.category}
                    </span>
                  </div>

                  <div className="product__content">
                    <div className="product__heading">
                      <div>
                        <span className="product__brand">{item.brand}</span>

                        <h3>{item.name}</h3>
                      </div>

                      <span className="product__type">{item.type}</span>
                    </div>

                    <div className="product__details">
                      <div className="product__detail">
                        <span>USAGE</span>
                        <strong>{item.usedFor}</strong>
                      </div>

                      <div className="product__detail">
                        <span>CONDITION</span>
                        <strong>{item.details.split(" · ")[0]}</strong>
                      </div>

                      <div className="product__detail">
                        <span>INCLUDED</span>
                        <strong>Box + Accessories</strong>
                      </div>
                    </div>

                    <div className="product__footer">
                      <div className="product__price">
                        <span>ASKING PRICE</span>
                        <strong>{item.price}</strong>
                      </div>

                      <div className="product__actions">
                        {item.reviewUrl !== "#" && (
                          <a
                            href={item.reviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="product__review"
                          >
                            REVIEW
                            <FiArrowUpRight />
                          </a>
                        )}

                        <a
                          href={item.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="product__buy"
                        >
                          BUY NOW
                          <FiArrowUpRight />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* PHILOSOPHY */}
          <section className="ex-review__philosophy">
            <div className="ex-review__philosophy-top">
              <span className="ex-review__eyebrow">
                <i />
                HOW IT WORKS
              </span>

              <span className="ex-review__philosophy-index">02 / 04</span>
            </div>

            <div className="ex-review__philosophy-statement">
              <h2>
                Good gear
                <br />
                <span>shouldn't sit.</span>
              </h2>

              <p>
                I don't believe in keeping things around just because they're
                mine. If a piece of gear isn't getting used anymore, I'd rather
                see it become part of someone else's setup.
              </p>
            </div>

            <div className="ex-review__process">
              {process.map((item) => (
                <div className="process-card" key={item.number}>
                  <span className="process-card__number">{item.number}</span>

                  <div className="process-card__body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ex-review__trust">
              <span className="ex-review__trust-mark">
                <FiCheck />
              </span>

              <span>
                Personally checked · Clearly described · Ready for its next
                setup
              </span>
            </div>
          </section>

          {/* ARCHIVE */}
          <section className="ex-review__archive-section">
            <div className="ex-review__section-top">
              <div>
                <span className="ex-review__eyebrow">PAST RELEASES</span>

                <h2>DROP ARCHIVE</h2>
              </div>

              <span className="ex-review__archive-count">
                {String(archive.length).padStart(2, "0")} DROPS
              </span>
            </div>

            <div className="ex-review__archive">
              {archive.map((item) => (
                <a href="#" className="archive-item" key={item.drop}>
                  <span className="archive-item__drop">{item.drop}</span>

                  <div className="archive-item__info">
                    <strong>{item.sold}</strong>
                    <span>{item.date}</span>
                  </div>

                  <span className="archive-item__status">
                    SOLD OUT
                    <FiArrowUpRight />
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="ex-review__cta">
            <div className="ex-review__cta-glow" />

            <span className="ex-review__eyebrow">
              <i />
              NEXT DROP
            </span>

            <h2>
              The next piece
              <br />
              <span>might be yours.</span>
            </h2>

            <p>
              New gear gets reviewed, used, and eventually released here. Follow
              along so you don't miss the next drop.
            </p>

            <a
              href="https://www.tiktok.com/@fesnotyours"
              target="_blank"
              rel="noopener noreferrer"
              className="ex-review__cta-button"
            >
              <span>FOLLOW @FESNOTYOURS</span>
              <FiArrowUpRight />
            </a>
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default ExReview;
