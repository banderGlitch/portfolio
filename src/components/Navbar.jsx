import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = ({ sections = [], currentSection = 0, onNavigate }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const handleNavigate = (index) => {
    if (typeof onNavigate === "function") {
      onNavigate(index);
    } else {
      window.dispatchEvent(
        new CustomEvent("setSection", { detail: { sectionIndex: index } })
      );
    }
    setMenuOpen(false);
  };

  return (
    <nav
      className={`relative z-50 px-4 md:px-8 py-3 flex justify-between items-center border-b ${
        darkMode
          ? "bg-[#050816]/95 text-white border-white/10"
          : "bg-white/95 text-gray-900 border-black/5"
      }`}
    >
      <button
        type="button"
        className="text-xl md:text-2xl font-bold cursor-pointer select-none flex items-center gap-2 no-tap-highlight transition-transform active:scale-95"
        onClick={() => handleNavigate(0)}
        title="Back to top"
      >
        <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent font-extrabold tracking-tight">
          Nernay.dev
        </span>
        <span className="hidden sm:inline-block text-sm font-mono opacity-60">
          {"<"}/{">"}
        </span>
      </button>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-2">
        {sections.map((section, index) => {
          const active = index === currentSection;
          return (
            <button
              key={section.name}
              type="button"
              onClick={() => handleNavigate(index)}
              className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors no-tap-highlight ${
                active
                  ? darkMode
                    ? "text-white"
                    : "text-gray-900"
                  : darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className={`absolute inset-0 rounded-full ${
                    darkMode ? "bg-white/10" : "bg-gray-900/10"
                  }`}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              )}
              <span className="relative">{section.name}</span>
            </button>
          );
        })}
        <div className="ml-3">
          <ToggleSwitch />
        </div>
      </div>

      {/* Mobile actions */}
      <div className="flex md:hidden items-center gap-3">
        <ToggleSwitch />
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className={`p-2 rounded-lg ${
            darkMode ? "hover:bg-white/10" : "hover:bg-black/5"
          }`}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full left-0 right-0 mx-4 mt-2 rounded-2xl shadow-xl border overflow-hidden ${
              darkMode
                ? "bg-[#0b1224]/95 border-white/10 text-white"
                : "bg-white/95 border-black/5 text-gray-900"
            }`}
          >
            {sections.map((section, index) => {
              const active = index === currentSection;
              return (
                <button
                  key={section.name}
                  type="button"
                  onClick={() => handleNavigate(index)}
                  className={`w-full text-left px-5 py-3 text-sm font-medium flex items-center justify-between transition-colors ${
                    active
                      ? darkMode
                        ? "bg-white/5"
                        : "bg-black/5"
                      : ""
                  }`}
                >
                  <span>{section.name}</span>
                  <span className="text-xs opacity-50 font-mono">
                    0{index + 1}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <div
        className={`absolute left-0 right-0 bottom-0 h-[2px] origin-left ${
          darkMode ? "bg-white/5" : "bg-black/5"
        }`}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 origin-left will-change-transform"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
