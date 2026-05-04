import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaUser,
  FaLinkedin,
  FaGithub,
  FaDownload,
  FaFilePdf,
  FaPaperPlane,
  FaCopy,
  FaCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { updateField, resetForm } from "../redux/contactSlice";

const EMAIL = "nernaykumar98@gmail.com";

const Contact = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.contact);
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [isDownloading, setIsDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const loadingToast = toast.loading("Preparing your message...");
    setIsSending(true);

    try {
      await new Promise((r) => setTimeout(r, 900));

      const subject = encodeURIComponent(
        `Hello from ${formData.name} via Portfolio`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

      toast.success("Opening your email client. Talk soon!", {
        duration: 4500,
        icon: "👋",
      });
      dispatch(resetForm());
    } catch (err) {
      toast.error("Something went wrong. Please email me directly.");
    } finally {
      toast.dismiss(loadingToast);
      setIsSending(false);
    }
  };

  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);
      const link = document.createElement("a");
      link.href = "/Nernay_Kumar_Resume.pdf";
      link.download = "Nernay_Kumar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Resume downloaded");
    } catch (err) {
      toast.error("Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy. Please copy manually.");
    }
  };

  const inputClasses = `
    w-full px-4 py-3 rounded-xl
    ${
      isDarkMode
        ? "bg-black/30 border-white/10 text-white placeholder-gray-500"
        : "bg-white border-black/10 text-gray-800 placeholder-gray-400"
    }
    border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30
    transition-all duration-300 outline-none
  `;

  return (
    <div className="w-full">
      <Toaster
        position={isMobile ? "bottom-center" : "top-right"}
        toastOptions={{
          success: {
            style: {
              background: isDarkMode ? "#065f46" : "#dcfce7",
              color: isDarkMode ? "#ffffff" : "#065f46",
            },
          },
          error: {
            style: {
              background: isDarkMode ? "#991b1b" : "#fee2e2",
              color: isDarkMode ? "#ffffff" : "#991b1b",
            },
          },
          loading: {
            style: {
              background: isDarkMode ? "#1e40af" : "#dbeafe",
              color: isDarkMode ? "#ffffff" : "#1e40af",
            },
          },
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-mono uppercase tracking-widest text-amber-400 mb-2">
            // contact
          </p>
          <h2
            className={`text-3xl md:text-5xl font-extrabold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Let's build <span className="gradient-text">something</span> good
          </h2>
        </motion.div>

        <motion.div
          className={`relative overflow-hidden rounded-3xl border p-6 md:p-10 ${
            isDarkMode
              ? "bg-white/5 border-white/10"
              : "bg-white border-black/5 shadow-xl"
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl bg-fuchsia-500/20 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl bg-indigo-500/20 pointer-events-none" />

          <div className="relative grid md:grid-cols-2 gap-8 md:gap-10">
            {/* Left */}
            <div className="space-y-6">
              <p
                className={`text-sm md:text-base ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Have an idea, a role, or just want to say hi? Drop a message —
                I usually reply within a day.
              </p>

              <motion.button
                onClick={handleDownloadCV}
                disabled={isDownloading}
                whileHover={{ scale: isDownloading ? 1 : 1.02 }}
                whileTap={{ scale: isDownloading ? 1 : 0.98 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400
                  flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-500/20
                  ${isDownloading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                <FaFilePdf />
                {isDownloading ? "Downloading..." : "Download Resume"}
                {!isDownloading && <FaDownload className="text-sm" />}
              </motion.button>

              <div
                className={`p-5 rounded-2xl space-y-4 ${
                  isDarkMode ? "bg-black/30 border border-white/10" : "bg-gray-50 border border-black/5"
                }`}
              >
                <button
                  type="button"
                  onClick={copyEmail}
                  className="w-full flex items-center gap-4 group text-left"
                >
                  <div
                    className={`p-3 rounded-xl ${
                      isDarkMode ? "bg-white/10" : "bg-white border border-black/5"
                    }`}
                  >
                    <FaEnvelope className="text-indigo-400 text-lg" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm">Email</h3>
                    <p
                      className={`text-sm truncate ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {EMAIL}
                    </p>
                  </div>
                  <span
                    className={`text-xs flex items-center gap-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                    {copied ? "Copied" : "Copy"}
                  </span>
                </button>

                <a
                  href="https://www.linkedin.com/in/nernay-kumar-7578a3155"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-4 group"
                >
                  <div
                    className={`p-3 rounded-xl ${
                      isDarkMode ? "bg-white/10" : "bg-white border border-black/5"
                    }`}
                  >
                    <FaLinkedin className="text-indigo-400 text-lg" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm">LinkedIn</h3>
                    <p
                      className={`text-sm truncate group-hover:text-indigo-400 transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      linkedin.com/in/nernay-kumar
                    </p>
                  </div>
                </a>

                <a
                  href="https://github.com/banderGlitch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-4 group"
                >
                  <div
                    className={`p-3 rounded-xl ${
                      isDarkMode ? "bg-white/10" : "bg-white border border-black/5"
                    }`}
                  >
                    <FaGithub className="text-indigo-400 text-lg" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm">GitHub</h3>
                    <p
                      className={`text-sm truncate group-hover:text-indigo-400 transition-colors ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      github.com/banderGlitch
                    </p>
                  </div>
                </a>

                <div className="w-full flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      isDarkMode ? "bg-white/10" : "bg-white border border-black/5"
                    }`}
                  >
                    <FaMapMarkerAlt className="text-indigo-400 text-lg" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm">Based in</h3>
                    <p
                      className={`text-sm truncate ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      India · Open to remote
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <motion.form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <FaUser
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    dispatch(
                      updateField({ field: "name", value: e.target.value })
                    )
                  }
                  className={`${inputClasses} pl-10`}
                />
              </div>

              <div className="relative">
                <FaEnvelope
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    dispatch(
                      updateField({ field: "email", value: e.target.value })
                    )
                  }
                  className={`${inputClasses} pl-10`}
                />
              </div>

              <div className="relative">
                <MdMessage
                  className={`absolute left-3 top-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <textarea
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={(e) =>
                    dispatch(
                      updateField({ field: "message", value: e.target.value })
                    )
                  }
                  className={`${inputClasses} pl-10 min-h-[160px] resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSending}
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400
                  flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-500/20
                  ${isSending ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                <FaPaperPlane />
                {isSending ? "Sending..." : "Send message"}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
