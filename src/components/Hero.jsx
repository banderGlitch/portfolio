import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";

const greetings = [
  { text: "Namaste", emoji: "🙏", language: "Hindi" },
  { text: "Bonjour", emoji: "🇫🇷", language: "French" },
  { text: "Hello", emoji: "👋", language: "English" },
  { text: "Hola", emoji: "🌞", language: "Spanish" },
  { text: "Ciao", emoji: "🇮🇹", language: "Italian" },
  { text: "こんにちは", emoji: "🎌", language: "Japanese" },
  { text: "안녕하세요", emoji: "🇰🇷", language: "Korean" },
  { text: "你好", emoji: "🇨🇳", language: "Chinese" },
];

const roles = [
  "Full Stack Developer",
  "React & React Native Engineer",
  "Web3 Builder",
  "AI / ML Enthusiast",
];

const Hero = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (isTyping) {
      const currentGreeting = greetings[currentGreetingIndex].text;
      if (displayText.length < currentGreeting.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentGreeting.slice(0, displayText.length + 1));
        }, 130);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 1100);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 80);
      } else {
        setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentGreetingIndex]);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const goToProjects = () => {
    window.dispatchEvent(
      new CustomEvent("setSection", { detail: { sectionId: "projects" } })
    );
  };

  const goToContact = () => {
    window.dispatchEvent(
      new CustomEvent("setSection", { detail: { sectionId: "contact" } })
    );
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/Nernay_Kumar_Resume.pdf";
    link.download = "Nernay_Kumar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium ${
          isDarkMode
            ? "border-white/15 bg-white/5 text-gray-300"
            : "border-black/10 bg-black/5 text-gray-700"
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        Available for new opportunities
      </motion.div>

      <motion.div
        className="mb-6 select-none"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <span className="text-5xl md:text-6xl">
          {greetings[currentGreetingIndex].emoji}
        </span>
      </motion.div>

      <div className="h-14 md:h-20">
        <motion.div
          className={`text-3xl md:text-5xl font-bold mb-2 font-mono ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <span>{displayText}</span>
          <motion.span
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block ml-1 text-indigo-400"
          >
            |
          </motion.span>
        </motion.div>
      </div>

      <motion.h1
        className={`text-4xl md:text-6xl font-extrabold mt-4 tracking-tight ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        I'm <span className="gradient-text">Nernay Kumar</span>
      </motion.h1>

      <motion.div
        className="mt-5 h-7 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          key={roleIndex}
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -28, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-base md:text-lg font-medium ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {roles[roleIndex]}
        </motion.div>
      </motion.div>

      <motion.p
        className={`mt-6 max-w-2xl text-sm md:text-base ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        I build performant, accessible web and mobile apps — from delightful UI
        in React & React Native to chain‑abstracted Web3 experiences. Currently
        exploring the intersection of AI and product engineering.
      </motion.p>

      <motion.div
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          type="button"
          onClick={goToProjects}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 text-white font-semibold shadow-lg shadow-fuchsia-500/20"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          View my work
          <FaArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </motion.button>

        <motion.button
          type="button"
          onClick={goToContact}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border transition-colors ${
            isDarkMode
              ? "border-white/15 hover:bg-white/10 text-white"
              : "border-black/10 hover:bg-black/5 text-gray-900"
          }`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <FaEnvelope />
          Get in touch
        </motion.button>

        <motion.button
          type="button"
          onClick={handleDownloadCV}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-colors ${
            isDarkMode
              ? "bg-white/5 hover:bg-white/10 text-white"
              : "bg-black/5 hover:bg-black/10 text-gray-900"
          }`}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <FaDownload />
          Resume
        </motion.button>
      </motion.div>

      <motion.div
        className="mt-8 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <a
          href="https://github.com/banderGlitch"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={`p-3 rounded-full transition-colors ${
            isDarkMode
              ? "bg-white/5 hover:bg-white/10 text-white"
              : "bg-black/5 hover:bg-black/10 text-gray-900"
          }`}
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/nernay-kumar-7578a3155"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={`p-3 rounded-full transition-colors ${
            isDarkMode
              ? "bg-white/5 hover:bg-white/10 text-white"
              : "bg-black/5 hover:bg-black/10 text-gray-900"
          }`}
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:nernaykumar98@gmail.com"
          aria-label="Email"
          className={`p-3 rounded-full transition-colors ${
            isDarkMode
              ? "bg-white/5 hover:bg-white/10 text-white"
              : "bg-black/5 hover:bg-black/10 text-gray-900"
          }`}
        >
          <FaEnvelope />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
