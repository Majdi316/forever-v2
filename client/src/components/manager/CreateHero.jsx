//TODO Libraries
import { useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
//TODO MUI Components
import { TextField } from "@mui/material";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Variables
import normalizeHero from "../../manager/normalization/heroNormalization";
import initHero from "../../manager/initData/initHero";
import createHeroSchema from "../../manager/schema/createHeroSchema";
import useForm from "../../hooks/useForm";
//TODO Main Function
const CreateHero = () => {
  //TODO Variables
  const { theme, backendUrl, navigate, token } = useContext(UserContext);
  //TODO Function
  const handleCreateHeroSection = async (data) => {
    const normalizeHeroForDb = normalizeHero(data);
    try {
      const response = await axios.post(
        backendUrl + "/api/hero",
        normalizeHeroForDb,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/manager/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //TODO Variables

  const { formDetails, errors, handleChange, handleSubmit } = useForm(
    initHero,
    createHeroSchema,
    handleCreateHeroSection
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
        className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg"
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
          Update Hero Section ✏️
        </h1>

        {/* === Form === */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            error={!!errors.title}
            helperText={errors.title}
            onChange={handleChange}
            value={formDetails.title}
          />
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            name="subTitle"
            label="Subtitle"
            variant="outlined"
            fullWidth
            error={!!errors.subTitle}
            helperText={errors.subTitle}
            onChange={handleChange}
            value={formDetails.subTitle}
          />
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            name="description"
            label="Description"
            multiline
            minRows={3}
            variant="outlined"
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
            onChange={handleChange}
            value={formDetails.description}
          />
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
            label="Image Alt Text"
            variant="outlined"
            fullWidth
            error={!!errors.alt}
            helperText={errors.alt}
            onChange={handleChange}
            value={formDetails.alt}
          />

          {/* === Update Button === */}
          <motion.button
            style={{
              background: DARK_MODE.Accent,
              color: "#fff",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-2.5 mt-2 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
          >
            Create
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateHero;
