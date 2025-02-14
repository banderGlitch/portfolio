import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaRobot, FaShoppingCart, FaUser ,FaEthereum , FaGooglePlay} from "react-icons/fa";
import ethGlobalLogo from "../assets/Ethglobal.png";
import thirdEyeThoughtsLogo from "../assets/thirdeye.png";
import innovPlusLogo from "../assets/logo-innov-plus.png";
const Projects = () => {
    const isDarkMode = useSelector((state) => state.theme.darkMode);

    const projects = useMemo(() => [
        { 
            title: "WNS - Web3 Name Service", 
            description: "Chain-abstracted, 3-word ENS alternative to any Web3 address. Winner of MetaMask & Linea prize at ETHGlobal Singapore.",
            icon: <FaEthereum className="text-4xl mb-4" />,
            gradient: "from-purple-500 to-pink-500",
            link: "https://ethglobal.com/showcase/wns-uvdv4",
            technologies: ["React Js", "Tailwind Css", "Flow", "Hedera", "Rootstock", "Aurora", "Morph", "Linea"],
            projectImage: ethGlobalLogo
          },
        { 
          title: "Third Eye Thoughts Affirmation", 
          description: "Daily affirmations that will change you life.",
          icon: <FaGooglePlay className="text-4xl mb-4" />,
          gradient: "from-blue-400 to-purple-500",
          link: "https://play.google.com/store/apps/developer?id=Third+Eye+Thoughts+LLC&hl=en_IN",
          technologies: ["React Native", "Tailwind Css", "Expo", "Firebase", "Google Play"],
          projectImage: thirdEyeThoughtsLogo
        },
        { 
          title: "Innov plus", 
          description: "Software as a service for the vehicle inspection industry",
          icon: <FaShoppingCart className="text-4xl mb-4" />,
          gradient: "from-green-400 to-blue-500",
          link: "https://innov-plus.com/",
          technologies: ["React Js", "Tailwind Css","Material UI", "Node Js", "Express Js", "MongoDB", "AWS"],
          projectImage: innovPlusLogo
        },
      ], []);
  
    return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl shadow-xl 
                ${isDarkMode ? 'bg-gradient-to-br' : 'bg-white'}
                ${isDarkMode ? project.gradient : ''}
                ${isDarkMode ? 'text-white' : 'text-gray-800'}
                transform transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
                <div className="flex items-start justify-between">
                {project.icon}
                {project.projectImage && (
                  <img 
                    src={project.projectImage} 
                    alt={project.title} 
                    className="h-8 w-auto"
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className={isDarkMode ? 'text-gray-200' : 'text-gray-600'}>
                {project.description}
              </p>
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 px-4 py-2 rounded-lg inline-block
                    ${isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}
                    hover:opacity-90 transition-opacity`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
                </motion.a>
              )}
              {project.technologies && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className={`text-xs px-2 py-1 rounded-full 
                        ${isDarkMode 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-200 text-gray-700'}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    );
  };
  
  export default Projects;