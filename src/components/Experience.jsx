import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaBriefcase, FaTrophy, FaCode, FaRocket } from "react-icons/fa";

const timeline = [
  {
    period: "2024 — Present",
    title: "Web3 & Full Stack Engineer",
    org: "Freelance / Hackathons",
    description:
      "Shipping decentralized apps and integrations across Ethereum, Hedera, Aurora, Linea, Rootstock, Morph and Flow. Won MetaMask & Linea prize at ETHGlobal Singapore for WNS — a chain‑abstracted naming service.",
    icon: <FaTrophy />,
    accent: "from-amber-500 to-pink-500",
    tags: ["Solidity", "Ethers.js", "React", "Hackathons"],
  },
  {
    period: "2023 — 2024",
    title: "Full Stack Developer",
    org: "Innov Plus",
    description:
      "Built a SaaS platform for the vehicle inspection industry — designing inspection workflows, dashboards, and APIs used by enterprise customers.",
    icon: <FaBriefcase />,
    accent: "from-emerald-500 to-blue-500",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
  },
  {
    period: "2022 — 2023",
    title: "React Native Developer",
    org: "Third Eye Thoughts",
    description:
      "Designed and shipped a daily affirmations mobile app to the Google Play Store with offline support, push notifications and a delightful animation system.",
    icon: <FaRocket />,
    accent: "from-indigo-500 to-purple-500",
    tags: ["React Native", "Expo", "Firebase"],
  },
  {
    period: "Earlier",
    title: "Software Engineer",
    org: "Various Projects",
    description:
      "Started my journey building UIs in JavaScript and quickly fell in love with the craft. Contributed to open‑source, learned the deep layers of the web platform, and built a strong product sense.",
    icon: <FaCode />,
    accent: "from-fuchsia-500 to-rose-500",
    tags: ["JavaScript", "HTML/CSS", "Open Source"],
  },
];

const Experience = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-mono uppercase tracking-widest text-fuchsia-400 mb-2">
            // experience
          </p>
          <h2
            className={`text-3xl md:text-5xl font-extrabold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            A short <span className="gradient-text">timeline</span>
          </h2>
          <p
            className={`mt-3 text-sm md:text-base max-w-xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Roles, milestones, and the moments that shaped how I build.
          </p>
        </motion.div>

        <div className="relative">
          {/* vertical line */}
          <div
            className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-px ${
              isDarkMode ? "bg-white/10" : "bg-black/10"
            }`}
          />

          <div className="flex flex-col gap-8">
            {timeline.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={item.title + idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className={`relative flex md:items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.accent} text-white flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-xs">{item.icon}</span>
                    </div>
                  </div>

                  {/* card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-10" : "md:pl-10"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -2 }}
                      className={`p-5 md:p-6 rounded-2xl border ${
                        isDarkMode
                          ? "bg-white/5 border-white/10 text-gray-200"
                          : "bg-white border-black/5 text-gray-700 shadow-sm"
                      }`}
                    >
                      <div
                        className={`text-xs font-mono mb-1 ${
                          isDarkMode ? "text-indigo-300" : "text-indigo-600"
                        }`}
                      >
                        {item.period}
                      </div>
                      <h3
                        className={`text-lg md:text-xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-sm font-medium mb-2 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {item.org}
                      </p>
                      <p className="text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className={`text-[11px] px-2 py-0.5 rounded-full ${
                              isDarkMode
                                ? "bg-white/10 text-gray-200"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
