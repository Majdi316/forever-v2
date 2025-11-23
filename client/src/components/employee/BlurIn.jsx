import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
const BlurIn = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default BlurIn;
