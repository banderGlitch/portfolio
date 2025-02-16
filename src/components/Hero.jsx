import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const navigate = useNavigate();

    const greetings = [
        { text: "Namaste", emoji: "🙏", language: "Hindi" },
        { text: "Bonjour", emoji: "🇫🇷", language: "French" },
        { text: "Hello", emoji: "👋", language: "English" },
        { text: "Hola", emoji: "🌞", language: "Spanish" },
        { text: "Ciao", emoji: "🇮🇹", language: "Italian" },
        { text: "こんにちは", emoji: "🎌", language: "Japanese" },
        { text: "안녕하세요", emoji: "🇰🇷", language: "Korean" },
        { text: "你好", emoji: "🇨🇳", language: "Chinese" },
    ];

    useEffect(() => {
        let timeout;

        if (isTyping) {
            const currentGreeting = greetings[currentGreetingIndex].text;
            if (displayText.length < currentGreeting.length) {
                // Typing effect
                timeout = setTimeout(() => {
                    setDisplayText(currentGreeting.slice(0, displayText.length + 1));
                }, 150);
            } else {
                // Wait before starting to erase
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 1000);
            }
        } else {
            if (displayText.length > 0) {
                // Erasing effect
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 100);
            } else {
                // Move to next greeting
                setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
                setIsTyping(true);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isTyping, currentGreetingIndex]);

    return (
        <>
        <motion.div
            className="h-screen flex flex-col items-center justify-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            >

                <motion.div
                    className="mb-8"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-6xl">{greetings[currentGreetingIndex].emoji}</span>
                </motion.div>

                <div className="h-20"> {/* Fixed height container for stable layout */}
                    <motion.div
                        className={`text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}
                    >
                        <span>{displayText}</span>
                        <motion.span
                            animate={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="inline-block ml-1"
                        >
                            |
                        </motion.span>
                    </motion.div>
                </div>

                <motion.h1
                    className={`text-4xl font-extrabold mt-8 ${isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}
                >
                    I'm <span className="text-blue-500">Nernay</span>
                </motion.h1>

                <motion.p
                    className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Full Stack Developer | React | React Native | Node.js | AI & ML Enthusiast
                </motion.p>
            </motion.div>

            <motion.button
                className={`fixed bottom-10 center-8 p-4 rounded-full shadow-lg 
                    ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
                    transition-all duration-200 flex items-center gap-2 z-50`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/chat')}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                </svg>
                <span className="text-white font-medium">AI Chat</span>
            </motion.button>
        </>
    );
};

export default Hero;