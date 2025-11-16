//TODO Libraries
import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
//TODO Components
import { UserContext } from "../context/UserContext";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";

//TODO Main Function
const Home = () => {
  //TODO Variables
  const { userFullDetails, token, user } = useContext(UserContext);
  //TODO States
  const [showLoader, setShowLoader] = useState(true);
  //TODO useEffect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
// -----------------------------------------------------------
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer);
  }, [token, userFullDetails, user]);

  //TODO Return
  return (
    <div className=" w-full">
      {/* === Loader Overlay === */}
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50"
          >
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-lg font-semibold">Loading...</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
