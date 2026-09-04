import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import PersonalHub from "./pages/PersonalHub";
import ExReview from "./pages/ExReview";

import ThemeToggle from "./components/ThemeToggle";

import "./App.css";

const App = () => {
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
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";

      localStorage.setItem("theme", next);

      return next;
    });
  };

  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <Routes>
        <Route path="/" element={<PersonalHub />} />
        <Route path="/ex-review" element={<ExReview />} />
      </Routes>
    </>
  );
};

export default App;
