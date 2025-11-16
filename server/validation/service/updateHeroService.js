//TODO Import Function

import updateHeroSchema from "../schema/updateHeroSchema.js";


//TODO Functions
const validateUpdateHero = (hero) => {
  return updateHeroSchema.validate(hero);
};

//TODO Export
export { validateUpdateHero };
