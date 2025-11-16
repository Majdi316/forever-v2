//TODO Import Function

import registerSchema from "../schema/registertSchema.js";


//TODO Functions
const validateUser = (user) => {
  return registerSchema.validate(user);
};

//TODO Export
export { validateUser };
