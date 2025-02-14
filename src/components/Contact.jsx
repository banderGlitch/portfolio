import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm } from "../redux/contactSlice";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

const Contact = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.contact);
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    dispatch(resetForm());
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
            
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <FaPaperPlane className="text-blue-500 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold">Social</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  @yourhandle
                </p>
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
  );
};

export default Contact;