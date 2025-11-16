export const customTextFieldStyles = (theme, LIGHT_MODE, DARK_MODE) => ({
  // 🔹 Label color
  "& .MuiInputLabel-root": {
    color: theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary, // text color // default label color
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary, // label color when focused
  },

  // 🔹 Input text color + placeholder
  "& .MuiInputBase-input": {
    color: theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary, // text color
  },
  "& .MuiInputBase-input::placeholder": {
    color: theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary, // placeholder color
    opacity: 1,
  },

  // 🔹 Border color
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor:
        theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary, // default border
    },
    "&:hover fieldset": {
      borderColor:
        theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary, // hover border
    },
    "&.Mui-focused fieldset": {
      borderColor:
        theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary, // focused border
    },
  },
});
