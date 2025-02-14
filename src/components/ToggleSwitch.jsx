import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toggleTheme } from "../redux/themeSlice";

const ToggleSwitch = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div
            onClick={() => dispatch(toggleTheme())}
            className={`relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-all`}
        >
            <motion.div
                className="w-6 h-6 bg-white dark:bg-black rounded-full shadow-md"
                initial={{ x: darkMode ? 24 : 0 }}
                animate={{ x: darkMode ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
            />
        </div>
    )

}

export default ToggleSwitch;
