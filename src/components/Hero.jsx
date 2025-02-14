import { motion } from "framer-motion";

const Hero = () => {
    return (
        <motion.div
          className="h-screen flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-5xl font-extrabold">Hi, I'm <span className="text-blue-500">Nernay</span></h1>
          <motion.p 
            className="mt-4 text-lg"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Full Stack Developer | React | Node.js | AI & ML Enthusiast
          </motion.p>
        </motion.div>
    )
}

export default Hero;
