import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import Chat from "./components/Chat";
import { FaChevronDown } from 'react-icons/fa';
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'; // Install this package: npm install react-responsive

const MainApp = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const location = useLocation();

  const sections = [
    { component: Hero, name: 'Hero' },
    { component: Projects, name: 'Projects' },
    { component: Contact, name: 'Contact' }
  ];

  useEffect(() => {
    const handleSetSection = (event) => {
      if (!isScrolling) {
        setIsScrolling(true);
        setCurrentSection(event.detail.sectionIndex);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    window.addEventListener('setSection', handleSetSection);

    return () => {
      window.removeEventListener('setSection', handleSetSection);
    };
  }, [isScrolling]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!touchStart || isScrolling) return;

    const touchEnd = e.touches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      setIsScrolling(true);

      // Determine direction (up or down)
      const direction = diff > 0 ? 1 : -1;

      setCurrentSection(prevSection => {
        const nextSection = prevSection + direction;
        if (nextSection >= 0 && nextSection < sections.length) {
          return nextSection;
        }
        return prevSection;
      });

      // Reset touch start
      setTouchStart(null);

      // Reset scroll lock after delay
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  // Handle mouse wheel for desktop
  const handleWheel = (e) => {
    if (isScrolling || isMobile) return;

    setIsScrolling(true);

    const direction = e.deltaY > 0 ? 1 : -1;

    setCurrentSection(prevSection => {
      const nextSection = prevSection + direction;
      if (nextSection >= 0 && nextSection < sections.length) {
        return nextSection;
      }
      return prevSection;
    });

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('wheel', preventDefault, { passive: false });
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('wheel', preventDefault);
      }
    };
  }, [isScrolling, sections.length, isMobile]);

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const getNextSectionName = () => {
    if (currentSection < sections.length - 1) {
      return sections[currentSection + 1].name;
    }
    return null;
  };

  const CurrentComponent = sections[currentSection].component;


  const isChatPage = location.pathname === '/chat';
  if (isChatPage) {
    return <Chat />;
  }  


  return (
    <div
      className="h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="h-[calc(100vh-64px)] flex items-center justify-center relative"
        >
          <CurrentComponent />

          {/* Navigation Dots and Scroll Guide - Hidden on Mobile */}
          {!isMobile && currentSection < sections.length - 1 && (
            <motion.div
              className="fixed right-8 bottom-8 flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {/* Scroll Guide */}
              <div className="text-center">
                <motion.p
                  className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                >
                  Scroll to {getNextSectionName()}
                </motion.p>

                {/* Animated Mouse Icon */}
                <div className={`w-5 h-8 rounded-full border-2 ${darkMode ? 'border-gray-300' : 'border-gray-600'
                  } mx-auto mb-2 relative`}>
                  <motion.div
                    className={`w-1 h-1 rounded-full ${darkMode ? 'bg-gray-300' : 'bg-gray-600'
                      } absolute left-1/2 top-2 -translate-x-1/2`}
                    animate={{
                      y: [0, 10, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Mobile Navigation Indicator */}
          {isMobile && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex gap-2">
                {sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${currentSection === index
                        ? 'bg-blue-500'
                        : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
   <Router>
      <Routes>
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;