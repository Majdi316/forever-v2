import Joi from "joi";
const updateHeroSchema = Joi.object({
  title: Joi.string().min(2).max(256).allow(""),
  subTitle: Joi.string().min(2).max(256).allow(""),
  description: Joi.string().min(2).max(256).allow(""),
  image: Joi.object().keys({
    url: Joi.string()
      .ruleset.regex(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
      .rule({ message: "user image must be a valid url" })
      .allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  
});

export default updateHeroSchema;
