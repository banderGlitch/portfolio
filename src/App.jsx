import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Provider, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import store from "./redux/store";
import Navbar from "./components/Navbar";
import Background from "./components/Background";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const SECTIONS = [
  { id: "home", name: "Home", component: Hero },
  { id: "about", name: "About", component: About },
  { id: "experience", name: "Experience", component: Experience },
  { id: "projects", name: "Projects", component: Projects },
  { id: "contact", name: "Contact", component: Contact },
];

const NAV_OFFSET = 64;

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
};

const MainApp = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [activeIndex, setActiveIndex] = useState(0);
  const offsetsRef = useRef([]);

  const sections = useMemo(() => SECTIONS, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleNavigate = useCallback(
    (index) => {
      if (sections[index]) scrollToSection(sections[index].id);
    },
    [sections]
  );

  useEffect(() => {
    const handleSetSection = (event) => {
      const idx = event?.detail?.sectionIndex;
      const targetId = event?.detail?.sectionId;
      if (typeof idx === "number" && sections[idx]) {
        scrollToSection(sections[idx].id);
      } else if (typeof targetId === "string") {
        scrollToSection(targetId);
      }
    };
    window.addEventListener("setSection", handleSetSection);
    return () => window.removeEventListener("setSection", handleSetSection);
  }, [sections]);

  useEffect(() => {
    const computeOffsets = () => {
      const scrollY = window.scrollY;
      offsetsRef.current = sections.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return 0;
        return el.getBoundingClientRect().top + scrollY;
      });
    };

    let ticking = false;
    let lastIndex = -1;

    const updateActive = () => {
      ticking = false;
      const offsets = offsetsRef.current;
      if (!offsets.length) return;
      const triggerY = window.scrollY + window.innerHeight * 0.35;
      let idx = 0;
      for (let i = 0; i < offsets.length; i += 1) {
        if (offsets[i] <= triggerY) idx = i;
        else break;
      }
      if (idx !== lastIndex) {
        lastIndex = idx;
        setActiveIndex(idx);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    };

    const onResize = () => {
      computeOffsets();
      onScroll();
    };

    computeOffsets();
    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, [sections]);

  return (
    <div className="relative min-h-screen no-tap-highlight">
      <Background />

      <div className="sticky top-0 z-50">
        <Navbar
          sections={sections}
          currentSection={activeIndex}
          onNavigate={handleNavigate}
        />
      </div>

      <main className="relative">
        {sections.map(({ id, component: Component }) => (
          <section
            key={id}
            id={id}
            className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 md:py-16"
          >
            <Component />
          </section>
        ))}
      </main>

      {/* Right side section indicator (desktop) */}
      {!isMobile && (
        <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {sections.map((section, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={section.id}
                type="button"
                aria-label={`Go to ${section.name}`}
                onClick={() => handleNavigate(index)}
                className="group relative flex items-center justify-end"
              >
                <span
                  className={`hidden lg:block mr-3 text-xs font-medium transition-opacity duration-200 ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  } ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  {section.name}
                </span>
                <span
                  className={`block rounded-full transition-colors duration-200 ${
                    active
                      ? "w-2.5 h-8 bg-gradient-to-b from-indigo-500 via-fuchsia-500 to-amber-400"
                      : darkMode
                      ? "w-2 h-2 bg-white/30 group-hover:bg-white/60"
                      : "w-2 h-2 bg-black/20 group-hover:bg-black/50"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
