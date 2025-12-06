import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(50).required(),
    middle: Joi.string().min(2).max(50).allow(""),
    last: Joi.string().min(2).max(50).required(),
  }),

  phone: Joi.string().pattern(/^[0-9]{9,12}$/),

  email: Joi.string().email(),

  age: Joi.number().min(12).max(120),

  gender: Joi.string().valid("male", "female"),

  password: Joi.string().min(8).max(30),

  image: Joi.object({
    url: Joi.string().uri(),
    alt: Joi.string().min(2).max(100),
  }),

  address: Joi.object({
    state: Joi.string().min(2).max(50),
    country: Joi.string().min(2).max(50),
    city: Joi.string().min(2).max(50),
    street: Joi.string().min(2).max(50),
    houseNumber: Joi.number().min(0),
    zip: Joi.number().min(0),
  }),
}).min(1);
