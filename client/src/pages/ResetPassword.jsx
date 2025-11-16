//TODO Libraries
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
//TODO Global Variables
import initResetPassword from "../auth/initialData/initResetPassword";
import resetPasswordSchema from "../auth/schema/resetPasswordSchema";
//TODO MUI Components
import { TextField } from "@mui/material";
//TODO Components
import useForm from "../hooks/useForm";
import { UserContext } from "../context/UserContext";
// TODO Styles
import { customTextFieldStyles } from "../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";
//TODO Main Function
const ResetPassword = () => {
  //TODO Variables
  const { resetPasswordToken } = useParams();
  const { backendUrl, navigate, theme } = useContext(UserContext);
  const handleResetPassword = async (data) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/auth/reset-password/" + resetPasswordToken,
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
    initResetPassword,
    resetPasswordSchema,
    handleResetPassword
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
        className=" shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg "
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
          Reset Password 🔒
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
          Enter your new password below to reset your account password.
        </p>

        {/* === Form === */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            type="password"
            name="password"
            label="New Password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            onChange={handleChange}
            value={formDetails.password}
          />

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
            className="w-full py-2.5 mt-2 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Reset Password
          </motion.button>
        </form>

        {/* === Footer Navigation === */}
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
                cursor: "pointer",
                color: DARK_MODE.Accent,
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

export default ResetPassword;
