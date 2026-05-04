import { useSelector } from "react-redux";

const Background = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div
        className={`absolute -top-40 -left-40 w-[360px] h-[360px] rounded-full blur-3xl gpu-layer ${
          isDarkMode ? "bg-indigo-500/20" : "bg-indigo-300/30"
        }`}
      />
      <div
        className={`absolute top-[40%] -right-40 w-[360px] h-[360px] rounded-full blur-3xl gpu-layer ${
          isDarkMode ? "bg-fuchsia-500/15" : "bg-pink-300/30"
        }`}
      />

      <div
        className={`absolute inset-0 ${
          isDarkMode
            ? "bg-gradient-to-b from-transparent via-[#050816]/30 to-[#050816]"
            : "bg-gradient-to-b from-transparent via-white/30 to-white"
        }`}
      />
    </div>
  );
};

export default Background;
