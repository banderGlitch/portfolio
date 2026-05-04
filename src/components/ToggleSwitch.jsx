import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleTheme } from "../redux/themeSlice";

const ToggleSwitch = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => dispatch(toggleTheme())}
      className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-r from-indigo-700 to-violet-700"
          : "bg-gradient-to-r from-amber-300 to-orange-400"
      }`}
    >
      <motion.div
        className="w-5 h-5 rounded-full shadow-md flex items-center justify-center bg-white text-amber-500 dark:text-indigo-700"
        initial={false}
        animate={{ x: darkMode ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {darkMode ? (
          <FaMoon className="text-[10px]" />
        ) : (
          <FaSun className="text-[10px]" />
        )}
      </motion.div>
    </button>
  );
};

export default ToggleSwitch;
