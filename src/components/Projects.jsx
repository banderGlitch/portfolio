import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaRobot, FaShoppingCart, FaUser } from "react-icons/fa";
const Projects = () => {
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    
    const projects = useMemo(() => [
        { 
          title: "AI Chatbot", 
          description: "A chatbot using OpenAI API",
          icon: <FaRobot className="text-4xl mb-4" />,
          gradient: "from-blue-400 to-purple-500"
        },
        { 
          title: "E-Commerce App", 
          description: "React & Redux-based shop",
          icon: <FaShoppingCart className="text-4xl mb-4" />,
          gradient: "from-green-400 to-blue-500"
        },
        { 
          title: "Portfolio Website", 
          description: "This website!",
          icon: <FaUser className="text-4xl mb-4" />,
          gradient: "from-purple-400 to-pink-500"
        }
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
              {project.icon}
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className={isDarkMode ? 'text-gray-200' : 'text-gray-600'}>
                {project.description}
              </p>
              <motion.button
                className={`mt-4 px-4 py-2 rounded-lg 
                  ${isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}
                  hover:opacity-90 transition-opacity`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
    );
  };
  
  export default Projects;