//TODO Libraries
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
//TODO Global Variables
import initForgotPassword from "../auth/initialData/initForgotPassword";
import forgotPasswordSchema from "../auth/schema/forgotPasswordSchema";
//TODO MUI Components
import { TextField } from "@mui/material";
//TODO Components
import useForm from "../hooks/useForm";
import { UserContext } from "../context/UserContext";
//TODO Styles
import { customTextFieldStyles } from "../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";
//TODO Main Function
const ForgotPassword = () => {
  //TODO Variables
  const { backendUrl, navigate, theme } = useContext(UserContext);
  const handleForgotPassword = async (data) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/auth/forgot-password",
        data
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //TODO Variables

  const { formDetails, errors, handleChange, handleSubmit } = useForm(
    initForgotPassword,
    forgotPasswordSchema,
    handleForgotPassword
  );
  //TODO Return
  return (
    <div
      style={{
        background:
          theme === "dark" ? DARK_MODE.Secondary : LIGHT_MODE.Secondary,
        transition: "all 0.3s ease",
      }}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 w-full"
    >
      <motion.div
        style={{
          background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
          transition: "all 0.3s ease",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg"
      >
        {/* === Title === */}
        <h1
          style={{
            color:
              theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
            transition: "all 0.3s ease",
          }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Forgot Password 🔑
        </h1>

        {/* === Description === */}
        <p
          style={{
            color:
              theme === "dark"
                ? DARK_MODE.TextSecondary
                : LIGHT_MODE.TextSecondary,
            transition: "all 0.3s ease",
          }}
          className="text-center mb-6 text-sm sm:text-base"
        >
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>

        {/* === Form === */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
            onChange={handleChange}
            value={formDetails.email}
          />

          {/* === Submit Button === */}
          <motion.button
            style={{
              background: DARK_MODE.Accent,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2.5 mt-2 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Send Reset Link
          </motion.button>
        </form>

        {/* === Back to Login === */}
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
            Remembered your password?{" "}
            <button
              style={{
                color: DARK_MODE.Accent,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate("/login")}
              className=" font-semibold hover:underline"
            >
              Back to Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
