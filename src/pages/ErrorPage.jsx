import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage({ code = 404, message = "Page Not Found" }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <AlertTriangle className="w-20 h-20 text-red-500 mb-4" />
        <h1 className="text-6xl font-bold text-gray-800 mb-2">{code}</h1>
        <p className="text-lg text-gray-600 mb-6">{message}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition-all"
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </div>
  );
}
