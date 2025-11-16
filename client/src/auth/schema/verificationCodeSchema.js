import Joi from "joi";
const verificationCodeSchema = {
  code: Joi.string().min(6).max(6).required(),
};
export default verificationCodeSchema;
