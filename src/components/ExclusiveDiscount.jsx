import { useRef, useState } from "react";
import "./ExclusiveDiscount.css";
import { FiArrowUpRight } from "react-icons/fi";
import { products } from "../data/exclusiveProducts";

const ExclusiveDiscount = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const cards = Array.from(slider.children);

    const scrollPosition = slider.scrollLeft;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.offsetLeft - scrollPosition);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };
  const scrollToProduct = (index) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.children[index];

    if (!card) return;

    slider.scrollTo({
      left: card.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  return (
    <section className="exclusive-discount">
      {/* Header */}
      <div className="exclusive-discount__header">
        <div>
          <span className="exclusive-discount__label">SPECIAL FOR YOU</span>

          <h2>Exclusive Deals</h2>

          <p>Special offers from brands I collaborate with.</p>
        </div>

        <span className="exclusive-discount__counter">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(products.length).padStart(2, "0")}
        </span>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="exclusive-discount__slider"
        onScroll={handleScroll}
      >
        {products.map((product) => (
          <article className="exclusive-discount__card" key={product.id}>
            {/* Image */}
            <div className="exclusive-discount__image">
              <img src={product.image} alt={product.title} />

              <span className="exclusive-discount__number">
                {String(product.id).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="exclusive-discount__content">
              <div className="exclusive-discount__info">
                <span className="exclusive-discount__percentage">
                  {product.discount || "—"}
                </span>

                <h3>{product.title}</h3>

                <span className="exclusive-discount__code">
                  {product.code
                    ? `USE CODE "${product.code}"`
                    : "NO DISCOUNT CODE AVAILABLE"}
                </span>
              </div>

              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="exclusive-discount__button"
              >
                Buy Now
                <FiArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Indicator */}
      <div className="exclusive-discount__indicator">
        {products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            className={index === activeIndex ? "active" : ""}
            onClick={() => scrollToProduct(index)}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ExclusiveDiscount;
