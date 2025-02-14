import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ToggleSwitch from "./ToggleSwitch";
const Navbar = () => {
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <motion.nav className={`p-4 flex justify-between items-center ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-2xl font-bold">My Portfolio</h1>
          <ToggleSwitch />
        </motion.nav>
    )
}

export default Navbar;