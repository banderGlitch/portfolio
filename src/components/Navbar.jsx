import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toggleTheme } from "../redux/themeSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <motion.nav className={`p-4 flex justify-between items-center ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
    >
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <button onClick={() => dispatch(toggleTheme())}
            className={`px-4 py-2 rounded-md ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
        >
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </motion.nav>
    )
}

export default Navbar;