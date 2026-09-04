import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun size={14} strokeWidth={1.8} />
      ) : (
        <Moon size={14} strokeWidth={1.8} />
      )}
    </button>
  );
};

export default ThemeToggle;
