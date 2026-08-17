import { useMemo, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

import { featuredProducts } from "../data/featuredProducts";

import "./FeaturedProducts.css";

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        featuredProducts.map((product) => product.category).filter(Boolean),
      ),
    ];

    return ["All", ...uniqueCategories];
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") {
      return featuredProducts;
    }

    return featuredProducts.filter(
      (product) => product.category === activeCategory,
    );
  }, [activeCategory]);

  const isAll = activeCategory === "All";
  const isSlider = !isAll && filteredProducts.length > 2;

  const marqueeProducts = useMemo(() => {
    if (!isAll || filteredProducts.length === 0) {
      return [];
    }

    return [...filteredProducts, ...filteredProducts];
  }, [filteredProducts, isAll]);

  const productsToRender = isAll ? marqueeProducts : filteredProducts;

  /* =========================
     SLIDER DRAG
  ========================= */

  const handleMouseDown = (e) => {
    if (!isSlider || !sliderRef.current) return;

    isDragging.current = true;
    hasDragged.current = false;

    startX.current = e.pageX;
    startScrollLeft.current = sliderRef.current.scrollLeft;

    sliderRef.current.classList.add("is-dragging");
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !sliderRef.current) return;

    const distance = e.pageX - startX.current;

    if (Math.abs(distance) > 5) {
      hasDragged.current = true;
    }

    sliderRef.current.scrollLeft = startScrollLeft.current - distance;
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;

    isDragging.current = false;

    sliderRef.current.classList.remove("is-dragging");

    setTimeout(() => {
      hasDragged.current = false;
    }, 50);
  };

  const handleClick = (e) => {
    if (hasDragged.current) {
      e.preventDefault();
    }
  };

  /* =========================
     CATEGORY CHANGE
  ========================= */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  };

  return (
    <section className="featured-products">
      {/* =========================
          HEADER
      ========================= */}

      <header className="featured-products__header">
        <span className="featured-products__eyebrow">CURATED TECH</span>

        <h2>Selected Gear</h2>

        <p>Things I use, test, and genuinely recommend.</p>
      </header>

      {/* =========================
          FILTER
      ========================= */}

      <div
        className="featured-products__filters"
        role="group"
        aria-label="Product categories"
      >
        <div className="featured-products__filter-track">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                className={`featured-products__filter ${
                  isActive ? "featured-products__filter--active" : ""
                }`}
                aria-pressed={isActive}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================
          PRODUCTS
      ========================= */}

      {filteredProducts.length > 0 ? (
        <>
          {/* =========================
              ALL → MARQUEE
          ========================= */}

          {isAll && (
            <div className="featured-products__marquee">
              <div className="featured-products__track" key={activeCategory}>
                {productsToRender.map((product, index) => (
                  <ProductCard
                    key={`${product.id}-${index}`}
                    product={product}
                  />
                ))}
              </div>
            </div>
          )}

          {/* =========================
              3+ → SLIDER
          ========================= */}

          {isSlider && (
            <div
              ref={sliderRef}
              className="featured-products__filtered featured-products__filtered--slider"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {productsToRender.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleClick}
                />
              ))}
            </div>
          )}

          {/* =========================
              1–2 → STATIC
          ========================= */}

          {!isAll && !isSlider && (
            <div className="featured-products__filtered featured-products__filtered--static">
              {productsToRender.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="featured-products__empty">
          No products in this category.
        </div>
      )}
    </section>
  );
};

/* =========================
   PRODUCT CARD
========================= */

const ProductCard = ({ product, onClick }) => {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="featured-product"
      onClick={onClick}
      draggable="false"
    >
      <div className="featured-product__image">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          draggable="false"
        />

        <span className="featured-product__arrow" aria-hidden="true">
          <FiArrowUpRight />
        </span>
      </div>

      <div className="featured-product__info">
        <span className="featured-product__brand">
          {product.brand || product.category}
        </span>

        <h3>{product.title}</h3>
      </div>
    </a>
  );
};

export default FeaturedProducts;
