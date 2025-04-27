import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-br from-white to-indigo-50 text-center px-4">
      {/* Animated 404 Number */}
      <motion.h1
        className="text-8xl font-extrabold text-primary mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        className="text-lg text-gray-700 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
