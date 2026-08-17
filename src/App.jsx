import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Profile from "./components/Profile";
import SocialLinks from "./components/SocialLinks";
import CollabCTA from "./components/CollabCTA";
import ExclusiveDiscount from "./components/ExclusiveDiscount";
import FeaturedProducts from "./components/FeaturedProducts";
import LinkButton from "./components/LinkButton";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

import { links } from "./data/links";

import "./App.css";

function App() {
  const [transitionDone, setTransitionDone] = useState(false);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    const hour = new Date().getHours();

    return hour >= 6 && hour < 18 ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

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
  }, [theme, transitionDone]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";

      localStorage.setItem("theme", nextTheme);

      return nextTheme;
    });
  };

  return (
    <main className="page">
      <PageTransition
        theme={theme}
        onComplete={() => setTransitionDone(true)}
      />

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
      </button>

      <div className="container">
        <div data-aos="fade-up">
          <Profile />
        </div>

        <div data-aos="fade-up" data-aos-delay="40">
          <SocialLinks />
        </div>

        <div data-aos="fade-up" data-aos-delay="80">
          <CollabCTA />
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
}

export default App;
