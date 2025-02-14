import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
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
          className="h-[calc(100vh-64px)] flex items-center justify-center"
        >
          <CurrentComponent />
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
// import Navbar from "./components/Navbar";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import Hero from "./components/Hero";
// import Contact from "./components/Contact";
// import Projects from "./components/Projects";
// const MainApp = () => {
//   const darkMode = useSelector((state) => state.theme.darkMode);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, [darkMode]);

//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <Projects />
//       <Contact />
//     </>
//   );
// };

// const App = () => (
//   <Provider store={store}>
//     <MainApp />
//   </Provider>
// );

// export default App;