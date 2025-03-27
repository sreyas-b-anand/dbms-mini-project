import { motion } from "framer-motion";
import '../../styles/Loader.css'
const Loader = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <motion.div
      className="loader"
      animate={{
        rotate: 360,
      }}
      transition={{
        repeat: Infinity,
        duration: 0.8,
        ease: "linear",
      }}
    />
    </div>
  );
};

export default Loader;
