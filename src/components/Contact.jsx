import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm } from "../redux/contactSlice";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaLinkedin, FaGithub, FaDownload, FaFilePdf } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast'; // Add this import
import { useMediaQuery } from 'react-responsive';

const Contact = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.contact);
    const isDarkMode = useSelector((state) => state.theme.darkMode);
    const [isDownloading, setIsDownloading] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // Show loading toast
        const loadingToast = toast.loading('Sending message...');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            toast.success('Message sent successfully! We\'ll get back to you soon.', {
                duration: 5000,
                icon: '👋',
            });
            
            // Reset form
            dispatch(resetForm());
            
        } catch (error) {
            // Error handling
            toast.error('Failed to send message. Please try again.');
            
        } finally {
            // Dismiss loading toast
            toast.dismiss(loadingToast);
        }
    };

    const handleDownloadCV = async () => {
        try {
            setIsDownloading(true);
            const link = document.createElement('a');
            link.href = '/Nernay_Kumar_Resume.pdf';
            link.download = 'Nernay_Kumar_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    const inputClasses = `
        w-full px-4 py-3 rounded-lg 
        ${isDarkMode
            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
            : 'bg-white border-gray-200 text-gray-800 placeholder-gray-500'} 
        border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
        transition-all duration-300 outline-none
    `;

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="h-[calc(100vh-64px)] overflow-y-auto">
       <Toaster
                position={isMobile ? "bottom-center" : "top-right"}
                toastOptions={{
                    success: {
                        style: {
                            background: isDarkMode ? '#065f46' : '#dcfce7',
                            color: isDarkMode ? '#ffffff' : '#065f46',
                        },
                    },
                    error: {
                        style: {
                            background: isDarkMode ? '#991b1b' : '#fee2e2',
                            color: isDarkMode ? '#ffffff' : '#991b1b',
                        },
                    },
                    loading: {
                        style: {
                            background: isDarkMode ? '#1e40af' : '#dbeafe',
                            color: isDarkMode ? '#ffffff' : '#1e40af',
                        },
                    },
                }}
            />
        <motion.div
            className={`w-full max-w-4xl mx-auto p-8 rounded-2xl shadow-xl 
                ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Section - Contact Info */}
                <motion.div
                    className="space-y-6"
                    variants={itemVariants}
                >
                    <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                        I'd love to hear from you. Whether you have a question or just want to say hi,
                        feel free to drop a message!
                    </p>

                    {/* CV Download Button */}
                    <motion.button
                        onClick={handleDownloadCV}
                        disabled={isDownloading}
                        className={`w-full py-3 px-6 rounded-lg 
                            ${isDarkMode ? 'bg-blue-500' : 'bg-blue-500'} 
                            text-white font-semibold
                            hover:bg-blue-600 active:bg-blue-700 
                            transition-colors duration-300
                            flex items-center justify-center gap-2
                            ${isDownloading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        whileHover={{ scale: isDownloading ? 1 : 1.02 }}
                        whileTap={{ scale: isDownloading ? 1 : 0.98 }}
                    >
                        <FaFilePdf className="text-xl" />
                        {isDownloading ? 'Downloading...' : 'Download CV'}
                        {!isDownloading && <FaDownload className="text-sm" />}
                    </motion.button>

                    <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <FaEnvelope className="text-blue-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                                    nernaykumar98@gmail.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <FaLinkedin className="text-blue-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold">LinkedIn</h3>
                                <a
                                    href="https://www.linkedin.com/in/nernay-kumar-7578a3155"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} 
                                        hover:text-blue-500 transition-colors duration-300 
                                        flex items-center gap-2`}
                                >
                                    <span className="truncate">linkedin.com/in/nernay-kumar</span>
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                <FaGithub className="text-blue-500 text-xl" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Github</h3>
                                <a
                                    href="https://github.com/banderGlitch"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} 
                                        hover:text-blue-500 transition-colors duration-300 
                                        flex items-center gap-2`}
                                >
                                    <span className="truncate">github.com/nernaykumar</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Section - Contact Form */}
                <motion.form
                    className="space-y-4"
                    onSubmit={handleSubmit}
                    variants={itemVariants}
                >
                    <div className="relative">
                        <FaUser className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => dispatch(updateField({ field: "name", value: e.target.value }))}
                            className={`${inputClasses} pl-10`}
                        />
                    </div>

                    <div className="relative">
                        <FaEnvelope className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => dispatch(updateField({ field: "email", value: e.target.value }))}
                            className={`${inputClasses} pl-10`}
                        />
                    </div>

                    <div className="relative">
                        <MdMessage className={`absolute left-3 top-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <textarea
                            placeholder="Message"
                            value={formData.message}
                            onChange={(e) => dispatch(updateField({ field: "message", value: e.target.value }))}
                            className={`${inputClasses} pl-10 min-h-[150px] resize-none`}
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className={`w-full py-3 px-6 rounded-lg bg-blue-500 text-white font-semibold
                            hover:bg-blue-600 active:bg-blue-700 transition-colors duration-300`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>
            </div>
        </motion.div>
        </div>
    );
};

export default Contact;