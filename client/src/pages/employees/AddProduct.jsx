import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Joi from "joi";
import { UserContext } from "../../context/UserContext";

const AddProduct = () => {
  const { token, backendUrl, navigate } = useContext(UserContext);
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
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Add New Product
      </h1>
      <form
        onSubmit={submitForm}
        className="grid gap-4 sm:grid-cols-2 sm:gap-6"
      >
        {/* Name */}
        <div className="sm:col-span-2">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className={`border p-2 rounded w-full ${
              errors.name ? "border-red-500" : ""
            }`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <textarea
            name="description"
            placeholder="Description"
            className={`border p-2 rounded w-full ${
              errors.description ? "border-red-500" : ""
            }`}
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className={`border p-2 rounded w-full ${
              errors.price ? "border-red-500" : ""
            }`}
            value={form.price}
            onChange={handleChange}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
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
          <p className="font-semibold mb-2">Sizes</p>
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
          <p className="font-semibold mb-2">Images</p>
          <div className="flex flex-col gap-2">
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
          <button
            type="button"
            onClick={addImageField}
            className="bg-gray-200 px-4 py-1 rounded mt-2"
          >
            + Add Image
          </button>
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
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="bg-black text-white py-2 rounded w-full hover:bg-gray-800 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
