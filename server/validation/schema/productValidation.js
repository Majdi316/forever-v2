import Joi from "joi";
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const baseProductSchema = {
  name: Joi.string().min(2).max(100).trim(),
  description: Joi.string().min(10),
  price: Joi.number().min(0),
  image: Joi.array()
    .items(
      Joi.object({
        url: Joi.string()
          .ruleset.regex(urlRegex)
          .rule({ message: 'card.image "url" mast be a valid url' })
          .allow(""),
        alt: Joi.string().optional(),
      })
    )
    .min(1),
  likes: Joi.array().items(Joi.string()).optional(),
  employee_id: Joi.string().allow(""),
  category: Joi.string().valid("Men", "Women", "Kids"),
  subCategory: Joi.string().valid("Topwear", "Bottomwear", "Winterwear"),
  sizes: Joi.array().items(
    Joi.string().valid("XS", "S", "M", "L", "XL", "XXL")
  ),
  date: Joi.number(),
  bestseller: Joi.boolean(),
  status: Joi.string().valid("Available", "Sold-Out", "Coming-Soon"),
};

export const createProductValidation = Joi.object({
  ...baseProductSchema,
  name: baseProductSchema.name.required(),
  description: baseProductSchema.description.required(),
  price: baseProductSchema.price.required(),
  image: baseProductSchema.image.required(),
  category: baseProductSchema.category.required(),
  subCategory: baseProductSchema.subCategory.required(),
});

export const updateProductValidation = Joi.object(baseProductSchema);
