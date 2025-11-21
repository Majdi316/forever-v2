//TODO Libraries
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Joi from "joi";
//TODO Context
import { UserContext } from "../../context/UserContext";
//TODO Theme
import { customTextFieldStyles } from "../../helper/styeTextInput";
import { DARK_MODE, LIGHT_MODE } from "../../theme/themeData";
//TODO MUI Components
import { Button, TextField } from "@mui/material";

const AddProduct = () => {
  //TODO Variables
  const {
    token,
    backendUrl,
    navigate,
    paperTheme,
    titleTheme,
    theme,
    buttonTheme,
    setProducts,
  } = useContext(UserContext);
  //TODO States
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    sizes: [],
    bestseller: false,
    status: "Available",
    image: [{ url: "", alt: "product image" }],
  });
  const [errors, setErrors] = useState({});
  //TODO Schema
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required().label("Name"),
    description: Joi.string().min(10).required().label("Description"),
    price: Joi.number().positive().required().label("Price"),
    category: Joi.string()
      .valid("Men", "Women", "Kids")
      .required()
      .label("Category"),
    subCategory: Joi.string()
      .valid("Topwear", "Bottomwear", "Winterwear")
      .required()
      .label("Sub-Category"),
    sizes: Joi.array()
      .items(Joi.string().valid("XS", "S", "M", "L", "XL", "XXL"))
      .min(1)
      .required()
      .label("Sizes"),
    bestseller: Joi.boolean(),
    status: Joi.string()
      .valid("Available", "Sold-Out", "Coming-Soon")
      .required()
      .label("Status"),
    image: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().uri().required().label("Image URL"),
          alt: Joi.string().min(2).required().label("Alt Text"),
        })
      )
      .min(1)
      .required()
      .label("Images"),
  });
  //TODO Function
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "sizes") {
      setForm((prev) => ({
        ...prev,
        sizes: checked
          ? [...prev.sizes, value]
          : prev.sizes.filter((s) => s !== value),
      }));
      return;
    }
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    validateField(name, type === "checkbox" ? checked : value);
  };

  const handleImageChange = (index, field, value) => {
    const images = [...form.image];
    images[index][field] = value;
    setForm({ ...form, image: images });
    validateField(`image.${index}.${field}`, value);
  };

  const addImageField = () => {
    setForm({
      ...form,
      image: [...form.image, { url: "", alt: "product image" }],
    });
  };

  const validateField = (name, value) => {
    let obj = {};
    if (name.startsWith("image")) {
      const [_, idx, field] = name.split(".");
      const image = { ...form.image[idx], [field]: value };
      obj = { image: [image] };
      const subSchema = Joi.object({
        image: Joi.array()
          .items(
            Joi.object({
              url: Joi.string().uri().required(),
              alt: Joi.string().min(2).required(),
            })
          )
          .min(1),
      });
      const { error } = subSchema.validate(obj);
      setErrors((prev) => ({
        ...prev,
        [name]: error ? error.details[0].message : "",
      }));
      return;
    }
    obj[name] = value;
    const subSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = subSchema.validate(obj);
    setErrors((prev) => ({
      ...prev,
      [name]: error ? error.details[0].message : "",
    }));
  };

  const validateForm = () => {
    const { error } = schema.validate(form, { abortEarly: false });
    if (!error) return null;
    const err = {};
    for (let item of error.details) {
      err[item.path.join(".")] = item.message;
    }
    return err;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      setErrors(err);
      toast.error("Please fix the errors in the form");
      return;
    }
    try {
      const response = await axios.post(backendUrl + "/api/products", form, {
        headers: { "x-auth-token": token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        // update the products in global state products in context
         setProducts((prev) => [...prev, response.data.data]);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  //TODO Return
  return (
    <div style={paperTheme} className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1
        style={titleTheme}
        className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left"
      >
        Add New Product
      </h1>
      <form
        onSubmit={submitForm}
        className="grid gap-4 sm:grid-cols-2 sm:gap-6"
      >
        {/* Name */}
        <div className="sm:col-span-2">
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            type="text"
            name="name"
            label="Product Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name}
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
        </div>
        {/* Description */}
        <div className="sm:col-span-2 w-full">
          <TextField
            type="text"
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            variant="outlined"
            name="description"
            label="Description"
            error={!!errors.description}
            helperText={errors.description}
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            maxRows={5}
          />
        </div>
        {/* Price */}
        <div>
          <TextField
            sx={customTextFieldStyles(theme, LIGHT_MODE, DARK_MODE)}
            type="number"
            name="price"
            label="Price"
            fullWidth
            value={form.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
          />
        </div>
        {/* Category */}
        <div>
          <select
            name="category"
            className={`border p-2 rounded w-full ${
              errors.category ? "border-red-500" : ""
            }`}
            value={form.category}
            onChange={handleChange}
          >
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>
        {/* SubCategory */}
        <div>
          <select
            name="subCategory"
            className={`border p-2 rounded w-full ${
              errors.subCategory ? "border-red-500" : ""
            }`}
            value={form.subCategory}
            onChange={handleChange}
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
          {errors.subCategory && (
            <p className="text-red-500 text-sm mt-1">{errors.subCategory}</p>
          )}
        </div>
        {/* Sizes */}
        <div className="sm:col-span-2">
          <p style={titleTheme} className="font-semibold mb-2">
            Sizes
          </p>
          <div className="flex flex-wrap gap-4">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="flex items-center">
                <input
                  type="checkbox"
                  name="sizes"
                  value={size}
                  checked={form.sizes.includes(size)}
                  onChange={handleChange}
                />
                <span className="ml-1">{size}</span>
              </label>
            ))}
          </div>
          {errors.sizes && (
            <p className="text-red-500 text-sm mt-1">{errors.sizes}</p>
          )}
        </div>
        {/* Images */}
        <div className="sm:col-span-2">
          <p style={titleTheme} className="font-semibold mb-2">
            Images
          </p>
          <div className="flex flex-col gap-2 w-full">
            {form.image.map((img, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:gap-2 items-start sm:items-center"
              >
                <input
                  type="text"
                  placeholder="Image URL"
                  className={`border p-2 rounded w-full sm:w-1/2 ${
                    errors[`image.${index}.url`] ? "border-red-500" : ""
                  }`}
                  value={img.url}
                  onChange={(e) =>
                    handleImageChange(index, "url", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Alt Text"
                  className={`border p-2 rounded w-full sm:w-1/2 mt-2 sm:mt-0 ${
                    errors[`image.${index}.alt`] ? "border-red-500" : ""
                  }`}
                  value={img.alt}
                  onChange={(e) =>
                    handleImageChange(index, "alt", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <Button
            className=" w-full sm:w-1/3"
            sx={{ ...buttonTheme, marginTop: "15px" }}
            type="button"
            onClick={addImageField}
          >
            + Add Image
          </Button>
        </div>

        {/* Bestseller */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="bestseller"
            checked={form.bestseller}
            onChange={handleChange}
          />
          <span className="ml-2">Bestseller</span>
        </div>

        {/* Status */}
        <div>
          <select
            name="status"
            className={`border p-2 rounded w-full ${
              errors.status ? "border-red-500" : ""
            }`}
            value={form.status}
            onChange={handleChange}
          >
            <option>Available</option>
            <option>Sold-Out</option>
            <option>Coming-Soon</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status}</p>
          )}
        </div>

        {/* Submit */}
        <div className="sm:col-span-2 w-full">
          <Button className=" w-full sm:w-1/3" sx={buttonTheme} type="submit">
            Add Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
