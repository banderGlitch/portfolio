import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiSolidity,
  SiEthereum,
  SiNextdotjs,
  SiRedux,
  SiFirebase,
  SiAmazon,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { FaReact, FaCode, FaServer, FaCubes, FaTools } from "react-icons/fa";

const skillGroups = [
  {
    title: "Frontend",
    icon: <FaCode />,
    accent: "from-indigo-500 to-blue-500",
    skills: [
      { name: "React", icon: <SiReact />, color: "text-sky-400" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "text-gray-200" },
      { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
      { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "text-cyan-400" },
      { name: "Redux", icon: <SiRedux />, color: "text-purple-400" },
    ],
  },
  {
    title: "Mobile",
    icon: <FaCubes />,
    accent: "from-fuchsia-500 to-pink-500",
    skills: [
      { name: "React Native", icon: <FaReact />, color: "text-sky-400" },
      { name: "Expo", icon: <FaCubes />, color: "text-indigo-300" },
      { name: "Firebase", icon: <SiFirebase />, color: "text-amber-400" },
    ],
  },
  {
    title: "Backend",
    icon: <FaServer />,
    accent: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "text-emerald-400" },
      { name: "Express", icon: <SiExpress />, color: "text-gray-300" },
      { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-sky-400" },
    ],
  },
  {
    title: "Web3 & Cloud",
    icon: <FaTools />,
    accent: "from-amber-500 to-orange-500",
    skills: [
      { name: "Solidity", icon: <SiSolidity />, color: "text-gray-300" },
      { name: "Ethereum", icon: <SiEthereum />, color: "text-indigo-300" },
      { name: "AWS", icon: <SiAmazon />, color: "text-amber-400" },
      { name: "Docker", icon: <SiDocker />, color: "text-sky-400" },
      { name: "Git", icon: <SiGit />, color: "text-orange-400" },
    ],
  },
];

const stats = [
  { value: "3+", label: "Years of experience" },
  { value: "20+", label: "Projects shipped" },
  { value: "1", label: "ETHGlobal win" },
  { value: "∞", label: "Cups of chai" },
];

const About = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-mono uppercase tracking-widest text-indigo-400 mb-2">
            // about me
          </p>
          <h2
            className={`text-3xl md:text-5xl font-extrabold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Crafting <span className="gradient-text">products</span> that feel
            right
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* Bio card */}
          <motion.div
            className={`lg:col-span-2 p-6 md:p-8 rounded-2xl border ${
              isDarkMode
                ? "bg-white/5 border-white/10 text-gray-200"
                : "bg-white border-black/5 text-gray-700 shadow-md"
            }`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className={`text-xl md:text-2xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Hey, I'm Nernay 👋
            </h3>
            <p className="text-sm md:text-base leading-relaxed mb-3">
              I'm a full‑stack developer who genuinely cares about the
              experience of using software. I love turning fuzzy ideas into
              fast, accessible interfaces and dependable backends.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-3">
              Recently, I've been deep in <span className="gradient-text font-semibold">Web3</span> —
              winning the MetaMask & Linea prize at ETHGlobal Singapore for{" "}
              <em>WNS</em>, a chain‑abstracted naming service.
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              When I'm not shipping, I'm exploring AI tooling, contributing to
              open source, or hunting for the perfect cup of chai.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={`p-3 rounded-xl text-center ${
                    isDarkMode
                      ? "bg-black/30 border border-white/5"
                      : "bg-gray-50 border border-black/5"
                  }`}
                >
                  <div className="text-2xl font-extrabold gradient-text">
                    {s.value}
                  </div>
                  <div
                    className={`text-xs mt-0.5 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 md:gap-6">
            {skillGroups.map((group, idx) => (
              <motion.div
                key={group.title}
                className={`relative p-5 md:p-6 rounded-2xl border overflow-hidden ${
                  isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-black/5 shadow-sm"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-30 bg-gradient-to-br ${group.accent}`}
                />
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 rounded-lg text-white bg-gradient-to-br ${group.accent}`}
                  >
                    {group.icon}
                  </div>
                  <h4
                    className={`text-lg font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {group.title}
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-colors ${
                        isDarkMode
                          ? "bg-black/30 border-white/10 text-gray-200 hover:bg-black/40"
                          : "bg-gray-50 border-black/5 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className={skill.color}>{skill.icon}</span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
