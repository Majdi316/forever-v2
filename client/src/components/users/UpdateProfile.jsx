// TODO Libraries
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
// TODO MUI
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  MenuItem,
} from "@mui/material";
// TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Main Component
const UpdateProfile = () => {
  //TODO Variables
  const {
    backendUrl,
    token,
    user,
    navigate,
    userFullDetails,
    setUserFullDetails,
    paperTheme,
    titleTheme,
    theme,
    buttonTheme,
  } = useContext(UserContext);
  const { id: userId } = useParams();
  //TODO States
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: { first: "", middle: "", last: "" },
    phone: "",
    email: "",
    age: "",
    gender: "",
    image: { url: "", alt: "" },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
  });

  //TODO useEffect
  //! fill inputs field with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: userFullDetails.name || {},
        phone: userFullDetails.phone || "",
        email: userFullDetails.email || "",
        age: userFullDetails.age || "",
        gender: userFullDetails.gender || "",
        image: userFullDetails.image || {},
        address: userFullDetails.address || {},
      });
    }
  }, [user, userFullDetails]);

  //TODO Functions
  //! handle objects change
  const handleNestedChange = (parent, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));
  };

  //! handle regular change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //! handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${backendUrl}/api/users/update/${userId}`,
        formData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setUserFullDetails(data.user);
      toast.success("Profile updated successfully ✅");
      navigate(`/user/profile`);
    } catch (error) {
      error?.response?.data?.errors.map((mes) => toast.error(mes));
    } finally {
      setLoading(false);
    }
  };
  //TODO Return
  return (
    <Card
      className=" rounded-2xl"
      sx={{ ...paperTheme, maxWidth: 750, mx: "auto", mt: 4, p: 2 }}
    >
      <CardContent>
        <Typography sx={titleTheme} variant="h5" mb={3}>
          Update Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name */}
            <div className=" flex flex-col sm:flex-row gap-5 w-full">
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="First Name"
                fullWidth
                value={formData.name.first}
                onChange={(e) =>
                  handleNestedChange("name", "first", e.target.value)
                }
              />
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="Middle Name"
                fullWidth
                value={formData.name.middle}
                onChange={(e) =>
                  handleNestedChange("name", "middle", e.target.value)
                }
              />
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="Last Name"
                fullWidth
                value={formData.name.last}
                onChange={(e) =>
                  handleNestedChange("name", "last", e.target.value)
                }
              />
            </div>

            {/* Phone & Gender & Age */}
            <div className=" flex flex-col sm:flex-row gap-5 w-full">
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="Phone"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="Age"
                type="number"
                fullWidth
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                select
                label="Gender"
                fullWidth
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </div>

            {/* Email */}
            <div className=" flex flex-col sm:flex-row gap-5 w-full">
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="Email"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Image */}
            <div className=" flex flex-col sm:flex-row gap-5 w-full">
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="Image URL"
                fullWidth
                value={formData.image.url}
                onChange={(e) =>
                  handleNestedChange("image", "url", e.target.value)
                }
              />
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="Image Alt"
                fullWidth
                value={formData.image.alt}
                onChange={(e) =>
                  handleNestedChange("image", "alt", e.target.value)
                }
              />
            </div>

            {/* Address */}
            <div className=" flex flex-col sm:flex-row gap-5 w-full">
              {["state", "country"].map((field) => (
                <TextField
                  sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                  label={field}
                  fullWidth
                  value={formData.address[field]}
                  onChange={(e) =>
                    handleNestedChange("address", field, e.target.value)
                  }
                />
              ))}
            </div>

            <div className=" flex flex-col sm:flex-row gap-5 w-full">
              {["city", "street"].map((field) => (
                <TextField
                  sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                  label={field}
                  fullWidth
                  value={formData.address[field]}
                  onChange={(e) =>
                    handleNestedChange("address", field, e.target.value)
                  }
                />
              ))}
            </div>

            <div className=" flex flex-col sm:flex-row gap-5 w-full">
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="House No."
                type="number"
                fullWidth
                value={formData.address.houseNumber}
                onChange={(e) =>
                  handleNestedChange("address", "houseNumber", e.target.value)
                }
              />
              <TextField
                sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
                label="Zip"
                type="number"
                fullWidth
                value={formData.address.zip}
                onChange={(e) =>
                  handleNestedChange("address", "zip", e.target.value)
                }
              />
            </div>
          </Grid>

          <Button
            type="submit"
            fullWidth
            sx={{ ...buttonTheme, mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateProfile;
