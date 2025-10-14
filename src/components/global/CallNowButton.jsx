import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

const CallNowButton = () => {
  return (
    <motion.a
      href="tel:+8801XXXXXXXXX" // replace with your number
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 15px rgba(16, 185, 129, 0.6)",
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg"
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <PhoneCall size={20} />
      </motion.div>
      <span className="font-semibold">Call Us Now</span>
    </motion.a>
  );
};

export default CallNowButton;
