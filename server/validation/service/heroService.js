//TODO Import Function
import heroSchema from "../schema/heroSchema.js";

//TODO Functions
const validateHero = (hero) => {
  return heroSchema.validate(hero);
};

//TODO Export
export { validateHero };
