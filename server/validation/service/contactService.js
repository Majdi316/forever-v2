//TODO Import Function

import {
  createContactValidation,
  updateContactValidation,
} from "../schema/contactSchema.js";

//TODO Functions
const validateContact = (contact) => {
  return createContactValidation.validate(contact);
};
const validateUpdateContact = (contact) => {
  return updateContactValidation.validate(contact);
};
//TODO Export
export { validateContact, validateUpdateContact };
