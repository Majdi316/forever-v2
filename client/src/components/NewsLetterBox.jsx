//TODO Libraries
import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import axios from "axios";
//TODO Context
import { UserContext } from "../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";
//TODO Main Component
const NewsLetterBox = () => {
  //TODO Variables
  const {
    theme,
    userFullDetails,
    user,
    backendUrl,
    token,
    updateSubscription,
  } = useContext(UserContext);
  //TODO States
  const [userDetails, setUser] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  //TODO Functions
  const handleSubscribe = async () => {
    if (!user) return;

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/users/subscribe`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );

      setUser((prev) => ({ ...prev, isSubscribe: data.isSubscribe }));
      updateSubscription(data.isSubscribe); // Update global context
      if (data.isSubscribe) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
        toast.success(data.message);
      } else {
        toast.info(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  //TODO useEffects
  useEffect(() => {
    setUser(userFullDetails);

    //! Trigger confetti if subscribed
    if (userFullDetails?.isSubscribe) {
      setShowConfetti(true);
      //! Stop confetti after 5 seconds
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [userFullDetails]);

  return (
    <div className="text-center relative">
      {/* Confetti */}
      {showConfetti && <Confetti numberOfPieces={150} recycle={false} />}

      <p
        style={{
          color:
            theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
        }}
        className="text-2xl font-medium"
      >
        Subscribe now & get 20% off
      </p>
      <p
        style={{
          color:
            theme === "dark"
              ? DARK_MODE.TextSecondary
              : LIGHT_MODE.TextSecondary,
        }}
        className="mb-6 text-sm md:text-base mx-4"
      >
        Join the style movement — subscribe today and unlock 20% off your first
        order, plus early access to exclusive drops and fashion updates.
      </p>
      {!user ? (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-yellow-500 font-semibold text-sm sm:text-base bg-yellow-100 px-4 py-2 rounded-md inline-block shadow-sm"
        >
          ⚠️ Please log in to subscribe
        </motion.p>
      ) : (
        <AnimatePresence>
          {userDetails?.isSubscribe ? (
            <motion.p
              key="subscribe-message"
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-green-500 font-bold text-lg"
            >
              🎉 Thank you for subscribing!
            </motion.p>
          ) : (
            <motion.button
              type="button"
              onClick={handleSubscribe}
              style={{ background: DARK_MODE.Accent }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-semibold text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 cursor-pointer"
            >
              SUBSCRIBE
            </motion.button>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default NewsLetterBox;
