//TODO Libraries
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
//TODO MUI Components
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
//TODO MUI Icons
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Global Variables
import { productSchema } from "../../helper/updateProductSchema";
//TODO Components
import Title from "../Title";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO Main Function
export default function UpdateProduct() {
  //TODO Variables
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl, token, products, setProducts, paperTheme, theme } =
    useContext(UserContext);
  //TODO States
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subCategory: "",
    status: "",
    sizes: [],
    bestseller: false,
    image: [],
  });
  //TODO UseEffects
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const found = products.find((p) => p._id === id);
    if (found) {
      setForm({
        name: found.name,
        description: found.description,
        price: found.price,
        category: found.category,
        subCategory: found.subCategory,
        status: found.status,
        sizes: found.sizes,
        bestseller: found.bestseller,
        image: found.image,
      });
    }
  }, [id, products]);
  //TODO Functions
  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleSize = (size) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleUpdate = async () => {
    const { error } = productSchema.validate(form, { abortEarly: false });
    if (error) {
      const fieldErrors = {};
      error.details.forEach((err) => {
        const key = err.path[0];
        fieldErrors[key] = err.message;
        toast.error(err.message);
      });
      setErrors(fieldErrors);
      return;
    }
    // Clear previous errors
    setErrors({});
    try {
      const res = await axios.put(
        `${backendUrl}/api/products/update/${id}`,
        form,
        {
          headers: { "x-auth-token": token },
        }
      );

      if (res.data.success) {
        toast.success("Product updated!");
        // Update products in context immediately
        const updatedProducts = products.map((p) =>
          p._id === id ? { ...p, ...form } : p
        );
        setProducts(updatedProducts);
        navigate(`/`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating product");
    }
  };

  const removeImage = (index) => {
    const updatedImages = form.image.filter((_, i) => i !== index);
    updateField("image", updatedImages);
  };
  //TODO Return
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" w-full p-6"
    >
      {/* Title */}
      <div className=" text-center py-8 text-3xl">
        <Title text1={"UPDATE"} text2={"PRODUCT"} />
      </div>

      <Card
        sx={{ ...paperTheme, p: 4, borderRadius: 4, boxShadow: 4 }}
        className=" w-full"
      >
        <CardContent>
          <Grid container spacing={4}>
            {/* NAME */}
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              fullWidth
              label="Product Name"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              error={!!errors.name}
              helperText={errors.name || ""}
            />
            {/* DESCRIPTION */}
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              error={!!errors.description}
              helperText={errors.description || ""}
            />
            {/* PRICE */}
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              fullWidth
              type="number"
              label="Price"
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              error={!!errors.price}
              helperText={errors.price || ""}
            />
            {/* CATEGORY */}
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              select
              fullWidth
              label="Category"
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              error={!!errors.category}
              helperText={errors.category || ""}
            >
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
            </TextField>
            {/* SUBCATEGORY */}
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              select
              fullWidth
              label="Subcategory"
              value={form.subCategory}
              onChange={(e) => updateField("subCategory", e.target.value)}
              error={!!errors.subCategory}
              helperText={errors.subCategory || ""}
            >
              <MenuItem value="Topwear">Topwear</MenuItem>
              <MenuItem value="Bottomwear">Bottomwear</MenuItem>
              <MenuItem value="Winterwear">Winterwear</MenuItem>
            </TextField>
            {/* STATUS */}
            <TextField
              sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
              select
              fullWidth
              label="Status"
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              error={!!errors.status}
              helperText={errors.status || ""}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Sold-Out">Sold Out</MenuItem>
              <MenuItem value="Coming-Soon">Coming Soon</MenuItem>
            </TextField>
            {/* BESTSELLER */}
            <div className=" w-full">
              <FormControlLabel
                control={
                  <Switch
                    checked={form.bestseller}
                    onChange={() => updateField("bestseller", !form.bestseller)}
                  />
                }
                label="Bestseller"
              />
            </div>
            {/* SIZES */}
            <Grid item xs={12}>
              <Typography fontWeight="bold" mb={1}>
                Sizes
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <Button
                    key={size}
                    variant={
                      form.sizes.includes(size) ? "contained" : "outlined"
                    }
                    color="warning"
                    onClick={() => toggleSize(size)}
                    sx={{ borderRadius: 5 }}
                  >
                    {size}
                  </Button>
                ))}
              </Box>
              {errors.sizes && (
                <Typography color="error" variant="body2" mt={1}>
                  {errors.sizes}
                </Typography>
              )}
            </Grid>
            {/* IMAGES */}
            <Grid item xs={12}>
              <Typography fontWeight="bold" mb={2}>
                Images
              </Typography>
              <Button
                startIcon={<AddPhotoAlternateIcon />}
                variant="outlined"
                color="warning"
                sx={{ mb: 3, borderRadius: 3 }}
                onClick={() =>
                  updateField("image", [
                    ...form.image,
                    {
                      url: "data:image/png;base64,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",
                      alt: "product image",
                    },
                  ])
                }
              >
                Add Image
              </Button>
              <Grid container spacing={3}>
                {form.image.map((img, index) => (
                  <div key={index} className=" w-full">
                    <Card
                      className=" flex flex-col gap-2 sm:flex-row"
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        position: "relative",
                        background:
                          theme === "dark"
                            ? DARK_MODE.Secondary
                            : LIGHT_MODE.Secondary,
                      }}
                    >
                      <div>
                        <IconButton
                          onClick={() => removeImage(index)}
                          color="error"
                          sx={{ position: "absolute", top: 10, right: 10 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <img
                          src={img.url}
                          alt={img.alt}
                          style={{
                            width: 180,
                            height: 180,
                            objectFit: "cover",
                            borderRadius: 12,
                          }}
                        />
                      </div>
                      <div className=" w-full mt-8 flex flex-col gap-5">
                        <TextField
                          sx={customTextFieldStyles(
                            theme,
                            LIGHT_MODE,
                            DARK_MODE
                          )}
                          fullWidth
                          label="Image URL"
                          value={img.url}
                          onChange={(e) => {
                            const updated = [...form.image];
                            updated[index].url = e.target.value;
                            updateField("image", updated);
                          }}
                        />
                        <TextField
                          sx={customTextFieldStyles(
                            theme,
                            LIGHT_MODE,
                            DARK_MODE
                          )}
                          fullWidth
                          label="Alt Text"
                          value={img.alt}
                          onChange={(e) => {
                            const updated = [...form.image];
                            updated[index].alt = e.target.value;
                            updateField("image", updated);
                          }}
                        />
                      </div>
                    </Card>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="warning"
        fullWidth
        sx={{ mt: 4, py: 2, borderRadius: 3, fontSize: "1.1rem" }}
        onClick={handleUpdate}
      >
        Save Changes
      </Button>
    </motion.div>
  );
}
