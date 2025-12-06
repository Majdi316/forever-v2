// TODO Libraries
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// TODO MUI
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
// TODO Context
import { UserContext } from "../../context/UserContext";
// TODO Theme
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
import { customTextFieldStyles } from "../../helper/styeTextInput";
//TODO Components
import ContactDetails from "./ContactDetails";
//TODO Main Component
const ContactViews = () => {
  //TODO Variables
  const { theme, backendUrl, token, buttonTheme, user, navigate } =
    useContext(UserContext);
  // TODO States
  const [formData, setFormData] = useState({
    subject: "",
    content: "",
  });
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  // TODO Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // TODO Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.content) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}/api/contacts/create`,
        formData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      toast.success(data.message);
      setFormData({ subject: "", content: "" });

      // THIS FORCES ContactDetails TO RE-FETCH
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };
  //TODO View if user not login
  if (!user) {
    return (
      <div className="w-full  flex justify-center items-center px-4 my-32">
        <Card
          sx={{
            width: "100%",
            maxWidth: 500,
            background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
            color:
              theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
            borderRadius: "1rem",
            textAlign: "center",
          }}
          className="shadow-xl"
        >
          <CardContent className="flex flex-col gap-4">
            <Typography variant="h5" fontWeight="bold">
              Login Required
            </Typography>

            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              You must be logged in to send us a message.
            </Typography>

            <Button
              variant="contained"
              sx={buttonTheme}
              onClick={() => navigate(`/login`)}
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  //TODO Return
  return (
    <div className="w-full flex-col flex justify-center items-center px-4 my-20">
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          background: theme === "dark" ? DARK_MODE.Paper : LIGHT_MODE.Paper,
          color:
            theme === "dark" ? DARK_MODE.TextPrimary : LIGHT_MODE.TextPrimary,
          borderRadius: "1rem",
        }}
        className="shadow-xl"
      >
        <CardContent className="flex flex-col gap-6">
          {/* Title */}
          <Typography variant="h5" className="text-center font-semibold">
            Send Us a Message
          </Typography>
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              fullWidth
              required
              autoComplete="off"
            />
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              label="Message"
              name="content"
              value={formData.content}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              autoComplete="off"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={buttonTheme}
              className="w-full"
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <ContactDetails refresh={refreshFlag} />
    </div>
  );
};

export default ContactViews;
