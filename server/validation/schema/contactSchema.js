import Joi from "joi";

export const createContactValidation = Joi.object({
  userId: Joi.string().required(),
  subject: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(5).max(1000).required(),
  answer: Joi.string().allow("").optional(),
});

export const updateContactValidation = Joi.object({
  subject: Joi.string().min(3).max(100),
  content: Joi.string().min(5).max(1000),
});

export const adminReplyValidation = Joi.object({
  answer: Joi.string().min(2).max(1000).required(),
});
