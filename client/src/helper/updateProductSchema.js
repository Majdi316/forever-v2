import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 3 characters",
  }),
  description: Joi.string().min(10).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters",
  }),
  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
    "any.required": "Price is required",
  }),
  category: Joi.string().required().messages({
    "string.empty": "Category is required",
  }),
  subCategory: Joi.string().required().messages({
    "string.empty": "Subcategory is required",
  }),
  status: Joi.string().required().messages({
    "string.empty": "Status is required",
  }),
  bestseller: Joi.boolean(),
  sizes: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "Select at least one size",
  }),
  image: Joi.array().allow("")
    
});

export { productSchema };
