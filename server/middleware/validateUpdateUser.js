import { updateUserSchema } from "../validation/schema/updateUserSchema.js";
export const validateUpdateUser = (req, res, next) => {
  const { value, error } = updateUserSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,   //removes _id automatically
  });

  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      errors: error.details.map((err) => err.message),
    });
  }
  req.body = value; // overwrite cleaned data
  next();
};