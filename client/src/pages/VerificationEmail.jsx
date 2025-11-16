//TODO Libraries
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
//TODO Global Variables
import initVerificationCode from "../auth/initialData/initVerificationCode";
import verificationCodeSchema from "../auth/schema/verificationCodeSchema";
//TODO Components
import useForm from "../hooks/useForm";
import { UserContext } from "../context/UserContext";
//TODO MUI Components
import { TextField } from "@mui/material";
//TODO Styles
import { customTextFieldStyles } from "../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";
//TODO Main Function
const VerificationEmail = () => {
  //TODO Variables
  const { backendUrl, navigate, theme } = useContext(UserContext);
  //TODO General Function
  const handleVerificationEmail = async (data) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/auth/verify-email",
        data
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { formDetails, errors, handleChange, handleSubmit } = useForm(
    initVerificationCode,
    verificationCodeSchema,
    handleVerificationEmail
  );

  //TODO Return

  return (
    <div
      style={{
        backgroundColor:
          theme === "dark" ? DARK_MODE.Secondary : LIGHT_MODE.Secondary,
        transition: "all 0.3s ease",
      }}
      className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        style={{
          backgroundColor:
            theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
          transition: "all 0.3s ease",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        {/* === Title === */}
        <h1
          style={{
            color:
              theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
            transition: "all 0.3s ease",
          }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
        >
          Verify Your Email 📧
        </h1>

        {/* === Description === */}
        <div
          style={{
            color:
              theme === "dark"
                ? DARK_MODE.TextSecondary
                : LIGHT_MODE.TextSecondary,
            transition: "all 0.3s ease",
          }}
          className="text-center mb-6 text-sm sm:text-base"
        >
          <p className="mb-2">
            We’ve sent a verification code to your email address.
          </p>
          <p>Please enter the code below to verify your account.</p>
        </div>

        {/* === Form === */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            name="code"
            label="Verification Code"
            variant="outlined"
            fullWidth
            error={!!errors.code}
            helperText={errors.code}
            onChange={handleChange}
            value={formDetails.code}
          />

          {/* === Submit Button === */}
          <motion.button
            style={{
              cursor: "pointer",
              background: DARK_MODE.Accent,
              color: "white",
              transition: "all 0.3s ease",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2.5 mt-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Verify Email
          </motion.button>
        </form>

        {/* === Footer === */}
        <div
          style={{
            color:
              theme === "dark"
                ? DARK_MODE.TextSecondary
                : LIGHT_MODE.TextSecondary,
            transition: "all 0.3s ease",
          }}
          className="text-center mt-6 text-sm sm:text-base"
        >
          <p>
            Didn’t get the email?{" "}
            <button
              style={{
                cursor: "pointer",
                color: DARK_MODE.Accent,
                transition: "all 0.3s ease",
              }}
              onClick={() =>
                toast.info("Please check your spam folder or try again.")
              }
              className="font-semibold hover:underline"
            >
              Resend
            </button>
          </p>

          <p className="mt-2">
            Already verified?{" "}
            <button
              style={{
                color: DARK_MODE.Accent,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate("/login")}
              className="font-semibold hover:underline"
            >
              Go to Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerificationEmail;
