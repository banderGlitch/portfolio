import { useSelector } from "react-redux";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

const Footer = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const year = new Date().getFullYear();

  return (
    <footer
      className={`relative z-10 px-4 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs border-t ${
        isDarkMode
          ? "bg-[#050816]/95 text-gray-400 border-white/10"
          : "bg-white/95 text-gray-500 border-black/5"
      }`}
    >
      <p className="flex items-center gap-1.5">
        © {year} Nernay Kumar · Built with{" "}
        <FaHeart className="text-pink-500 animate-pulse" /> using React, Vite &
        Tailwind
      </p>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/banderGlitch"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-indigo-400 transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/nernay-kumar-7578a3155"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-indigo-400 transition-colors"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:nernaykumar98@gmail.com"
          aria-label="Email"
          className="hover:text-indigo-400 transition-colors"
        >
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
