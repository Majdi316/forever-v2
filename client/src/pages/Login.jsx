//TODO Libraries
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
//TODO Global Variables
import initLoginData from "../auth/initialData/initLoginData";
import loginSchema from "../auth/schema/loginSchema";
//TODO MUI Components
import { TextField } from "@mui/material";
//TODO Components
import useForm from "../hooks/useForm";
import { UserContext } from "../context/UserContext";
//TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../theme/themeData";
import { customTextFieldStyles } from "../helper/styeTextInput";
//TODO Main Function
const Login = () => {
  //TODO Variables
  const { backendUrl, navigate, setToken, token, theme } =
    useContext(UserContext);
  //TODO General Function
  const handleLogin = async (data) => {
    try {
      const response = await axios.post(backendUrl + "/api/auth/login", data);
      if (response.data.success) {
        toast.success(response.data.message);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //TODO Variables

  const { formDetails, errors, handleChange, handleSubmit } = useForm(
    initLoginData,
    loginSchema,
    handleLogin
  );

  //TODO useEffect

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  //TODO Return

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 w-full"
      style={{
        background:
          theme === "dark" ? DARK_MODE.Secondary : LIGHT_MODE.Secondary,
        transition: "background 0.3s ease",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg "
        style={{
          background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
          transition: "background 0.3s ease",
        }}
      >
        {/* === Title === */}
        <h1
          style={{
            color:
              theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
            transition: "color 0.3s ease",
          }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6"
        >
          Welcome Back 👋
        </h1>

        {/* === Login Form === */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            onChange={handleChange}
            value={formDetails.email}
          />
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            onChange={handleChange}
            value={formDetails.password}
          />

          {/* === Forgot Password === */}
          <div className="flex justify-end -mt-2">
            <button
              style={{
                cursor: "pointer",
                color: DARK_MODE.Accent,
                transition: "all 0.3s ease",
              }}
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm sm:text-base text-blue-600 font-medium hover:underline transition-colors duration-200"
            >
              Forgot Password?
            </button>
          </div>

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
            className="w-full py-2.5 mt-2 text-white font-semibold rounded-full shadow-md  hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Login
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
          className="text-center mt-6  text-sm sm:text-base"
        >
          <p>
            Don’t have an account?{" "}
            <button
              style={{
                color: DARK_MODE.Accent,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate("/register")}
              className="font-semibold hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
