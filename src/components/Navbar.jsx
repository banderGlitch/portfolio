import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = () => {
    const darkMode = useSelector((state) => state.theme.darkMode);

    const handleScrollToTop = () => {
        // Dispatch a custom event that App.jsx listens for
        window.dispatchEvent(new CustomEvent('setSection', { 
            detail: { 
                sectionIndex: 0 // This will set it to the Hero section
            }
        }));
    };

    const emojis = "👨‍💻 < / > 🚀";

    return (
        <motion.nav 
            className={`p-4 flex justify-between items-center ${
                darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <motion.h1 
                className="text-2xl font-bold cursor-pointer select-none"
                onClick={handleScrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Scroll to top"
            >
                {emojis}
            </motion.h1>
            <ToggleSwitch />
        </motion.nav>
    );
};

export default Navbar;