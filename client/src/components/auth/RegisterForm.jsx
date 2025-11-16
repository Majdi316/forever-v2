//TODO Libraries
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
//TODO MUI Components
import { TextField } from "@mui/material";
//TODO Variables
import initRegisterData from "../../auth/initialData/initRegisterData";
import registerSchema from "../../auth/schema/registerSchema";
//TODO Normalize Data
import normalizeUser from "../../auth/normalize/registerNormalization";
//TODO Components
import useForm from "../../hooks/useForm";
//TODO Contexts and Theme
import { UserContext } from "../../context/UserContext";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
import { customTextFieldStyles } from "../../helper/styeTextInput";
//TODO Main Function
const RegisterForm = () => {
  //TODO Variables
  const { backendUrl, navigate, theme } = useContext(UserContext);
  //TODO General Function
  const handleSignup = async (userDetails) => {
    const userDetailsForServer = normalizeUser(userDetails);
    try {
      const response = await axios.post(
        backendUrl + "/api/auth/signup",
        userDetailsForServer
      );
      if (response.data.success) {
        toast.success(response.data?.message);
        navigate("/user/verify-email");
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };

  //TODO Variables
  const { formDetails, errors, handleChange, handleSubmit } = useForm(
    initRegisterData,
    registerSchema,
    handleSignup
  );
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
        className="shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-3xl"
        style={{
          background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
          transition: "background 0.3s ease",
          marginTop: "15px",
          marginBottom: "15px",
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
          Create New Account ✨
        </h1>

        {/* === Register Form === */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* === Row 1: Name Fields === */}
          <div className="flex flex-col sm:flex-row gap-4">
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="first"
              label="First Name"
              variant="outlined"
              fullWidth
              error={!!errors.first}
              helperText={errors.first}
              onChange={handleChange}
              value={formDetails.first}
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="middle"
              label="Middle Name"
              variant="outlined"
              fullWidth
              error={!!errors.middle}
              helperText={errors.middle}
              onChange={handleChange}
              value={formDetails.middle}
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="last"
              label="Last Name"
              variant="outlined"
              fullWidth
              error={!!errors.last}
              helperText={errors.last}
              onChange={handleChange}
              value={formDetails.last}
            />
          </div>

          {/* === Row 2: Basic Info === */}
          <div className="flex flex-col sm:flex-row gap-4">
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="age"
              label="Age"
              type="number"
              variant="outlined"
              fullWidth
              error={!!errors.age}
              helperText={errors.age}
              onChange={handleChange}
              value={formDetails.age}
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="gender"
              label="Gender"
              variant="outlined"
              fullWidth
              error={!!errors.gender}
              helperText={errors.gender}
              onChange={handleChange}
              value={formDetails.gender}
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="phone"
              label="Phone"
              variant="outlined"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
              onChange={handleChange}
              value={formDetails.phone}
            />
          </div>

          {/* === Row 3: Account Info === */}
          <div className="flex flex-col gap-4">
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              onChange={handleChange}
              value={formDetails.email}
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              onChange={handleChange}
              value={formDetails.password}
            />
          </div>

          {/* === Row 4: Image Info === */}
          <div className="flex flex-col sm:flex-row gap-4">
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="url"
              label="Image URL"
              variant="outlined"
              fullWidth
              error={!!errors.url}
              helperText={errors.url}
              onChange={handleChange}
              value={formDetails.url}
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="alt"
              label="Image Alt"
              variant="outlined"
              fullWidth
              error={!!errors.alt}
              helperText={errors.alt}
              onChange={handleChange}
              value={formDetails.alt}
            />
          </div>

          {/* === Row 5: State, Country, City === */}
          <div className="flex flex-col sm:flex-row gap-4">
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="state"
              label="State"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={formDetails.state}
              error={!!errors.state}
              helperText={errors.state}
              
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="country"
              label="Country"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={formDetails.country}
              error={!!errors.country}
              helperText={errors.country}
              
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="city"
              label="City"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={formDetails.city}
              error={!!errors.city}
              helperText={errors.city}
              
            />
          </div>

          {/* === Row 6: Street, HouseNumber, Zip === */}
          <div className="flex flex-col sm:flex-row gap-4">
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="street"
              label="Street"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={formDetails.street}
              error={!!errors.street}
              helperText={errors.street}
              
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="houseNumber"
              label="House Number"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={formDetails.houseNumber}
              error={!!errors.houseNumber}
              helperText={errors.houseNumber}
              
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              name="zip"
              label="Zip Code"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={formDetails.zip}
              error={!!errors.zip}
              helperText={errors.zip}
              
            />
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
            className="w-full py-2.5 mt-2 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Register
          </motion.button>
        </form>

        {/* === Footer Navigation === */}
        <div
          style={{
            color:
              theme === "dark"
                ? DARK_MODE.TextSecondary
                : LIGHT_MODE.TextSecondary,
            transition: "color 0.3s ease",
          }}
          className="text-center mt-6 text-sm sm:text-base"
        >
          <p>
            Already have an account?{" "}
            <button
              style={{
                color: DARK_MODE.Accent,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => navigate("/login")}
              className="font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
