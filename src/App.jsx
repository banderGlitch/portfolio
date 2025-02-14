import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import { FaChevronDown } from 'react-icons/fa'; // Add this import
import { AnimatePresence, motion } from "framer-motion";

const MainApp = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const sections = [
    { component: Hero, name: 'Hero' },
    { component: Projects, name: 'Projects' },
    { component: Contact, name: 'Contact' }
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (isScrolling) return;

      setIsScrolling(true);
      
      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;
      
      setCurrentSection(prevSection => {
        const nextSection = prevSection + direction;
        // Ensure we stay within bounds
        if (nextSection >= 0 && nextSection < sections.length) {
          return nextSection;
        }
        return prevSection;
      });

      // Reset scroll lock after delay
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    const handleKeyDown = (e) => {
      if (isScrolling) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsScrolling(true);
        
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        
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
      }
    };

    // Prevent default scroll behavior
    const preventDefault = (e) => {
      e.preventDefault();
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', preventDefault, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', preventDefault);
    };
  }, [isScrolling, sections.length]);

  const CurrentComponent = sections[currentSection].component;


  const getNextSectionName = () => {
    if (currentSection < sections.length - 1) {
      return sections[currentSection + 1].name;
    }
    return null;
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="h-[calc(80vh-64px)] flex items-center justify-center"
        >
          <CurrentComponent />
            {/* Scroll Guide */}
            {currentSection < sections.length - 1 && (
            <motion.div
              className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {/* Next Section Text */}
              <motion.p
                className={`text-sm mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                Scroll down to
                <span className="font-semibold ml-1">
                  {getNextSectionName()}
                </span>
              </motion.p>

              {/* Animated Scroll Icon */}
              <motion.div
                className="flex flex-col items-center"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className={`w-6 h-10 border-2 rounded-full mb-1 flex justify-center ${
                    darkMode 
                      ? 'border-gray-300' 
                      : 'border-gray-600'
                  }`}
                >
                  <motion.div
                    className={`w-1 h-2 rounded-full mt-2 ${
                      darkMode 
                        ? 'bg-gray-300' 
                        : 'bg-gray-600'
                    }`}
                    animate={{
                      y: [0, 12, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                >
                  <FaChevronDown 
                    className={`text-xl ${
                      darkMode 
                        ? 'text-gray-300' 
                        : 'text-gray-600'
                    }`}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;

