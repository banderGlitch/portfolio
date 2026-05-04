import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import {
  FaShoppingCart,
  FaEthereum,
  FaGooglePlay,
  FaExternalLinkAlt,
  FaGithub,
} from "react-icons/fa";
import ethGlobalLogo from "../assets/Ethglobal.png";
import thirdEyeThoughtsLogo from "../assets/thirdeye.png";
import innovPlusLogo from "../assets/logo-innov-plus.png";
import { useMediaQuery } from "react-responsive";

const ALL = "All";

const Projects = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [filter, setFilter] = useState(ALL);

  const projects = useMemo(
    () => [
      {
        title: "WNS — Web3 Name Service",
        description:
          "Chain‑abstracted, 3‑word ENS alternative for any Web3 address. Winner of the MetaMask & Linea prize at ETHGlobal Singapore.",
        icon: <FaEthereum className="text-3xl" />,
        gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
        link: "https://ethglobal.com/showcase/wns-uvdv4",
        repo: null,
        category: "Web3",
        featured: true,
        technologies: [
          "React",
          "Tailwind",
          "Flow",
          "Hedera",
          "Rootstock",
          "Aurora",
          "Morph",
          "Linea",
        ],
        projectImage: ethGlobalLogo,
      },
      {
        title: "Third Eye Thoughts Affirmations",
        description:
          "A daily affirmations mobile app on the Google Play Store with offline support, push notifications, and a delightful animation system.",
        icon: <FaGooglePlay className="text-3xl" />,
        gradient: "from-blue-400 via-indigo-500 to-purple-500",
        link: "https://play.google.com/store/apps/developer?id=Third+Eye+Thoughts+LLC&hl=en_IN",
        repo: null,
        category: "Mobile",
        technologies: [
          "React Native",
          "Tailwind",
          "Expo",
          "Firebase",
          "Google Play",
        ],
        projectImage: thirdEyeThoughtsLogo,
      },
      {
        title: "Innov Plus",
        description:
          "Software‑as‑a‑Service for the vehicle inspection industry — workflow automation, dashboards, and APIs used by enterprise customers.",
        icon: <FaShoppingCart className="text-3xl" />,
        gradient: "from-emerald-400 via-teal-500 to-cyan-500",
        link: "https://innov-plus.com/",
        repo: null,
        category: "SaaS",
        technologies: [
          "React",
          "Tailwind",
          "Material UI",
          "Node.js",
          "Express",
          "MongoDB",
          "AWS",
        ],
        projectImage: innovPlusLogo,
      },
    ],
    []
  );

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return [ALL, ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === ALL) return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  const stopBubble = (e) => e.stopPropagation();

  const Header = (
    <motion.div
      className="text-center mb-6 md:mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-sm font-mono uppercase tracking-widest text-emerald-400 mb-2">
        // selected work
      </p>
      <h2
        className={`text-3xl md:text-5xl font-extrabold tracking-tight ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Things I've <span className="gradient-text">built</span>
      </h2>
    </motion.div>
  );

  const Filters = (
    <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
      {categories.map((c) => {
        const active = c === filter;
        return (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={`relative px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors no-tap-highlight ${
              active
                ? "text-white"
                : isDarkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {active && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400"
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            )}
            <span className="relative z-10">{c}</span>
          </button>
        );
      })}
    </div>
  );

  const renderCard = (project, index) => (
    <motion.article
      key={project.title}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl border ${
        isDarkMode
          ? "bg-white/5 border-white/10"
          : "bg-white border-black/5 shadow-md"
      }`}
    >
      <div
        className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${project.gradient} pointer-events-none transition-opacity group-hover:opacity-50`}
      />

      <div className="relative p-5 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-2.5 rounded-xl text-white bg-gradient-to-br ${project.gradient}`}
          >
            {project.icon}
          </div>
          {project.projectImage && (
            <div
              className={`p-1.5 rounded-lg ${
                isDarkMode ? "bg-white/10" : "bg-gray-50"
              }`}
            >
              <img
                src={project.projectImage}
                alt={project.title}
                className="h-7 md:h-8 w-auto object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isDarkMode
                ? "bg-white/10 text-gray-200"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {project.category}
          </span>
          {project.featured && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white">
              Featured
            </span>
          )}
        </div>

        <h3
          className={`text-lg md:text-xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`text-sm leading-relaxed mb-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className={`text-[11px] px-2 py-0.5 rounded-full ${
                isDarkMode
                  ? "bg-black/30 text-gray-200 border border-white/10"
                  : "bg-gray-50 text-gray-600 border border-black/5"
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400 text-white"
            >
              View project <FaExternalLinkAlt className="text-[10px]" />
            </motion.a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold border ${
                isDarkMode
                  ? "border-white/15 hover:bg-white/10 text-white"
                  : "border-black/10 hover:bg-black/5 text-gray-900"
              }`}
            >
              <FaGithub />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );

  if (isMobile) {
    return (
      <div className="w-full">
        <div className="px-4 py-6">
          {Header}
          {Filters}

          <div
            className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar"
            onTouchStart={stopBubble}
            onTouchMove={stopBubble}
          >
            <div className="flex gap-4 pb-4 px-1">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, i) => (
                  <div
                    key={p.title}
                    className="flex-shrink-0 w-[85vw] snap-center"
                  >
                    {renderCard(p, i)}
                  </div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {Header}
        {Filters}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => renderCard(p, i))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
