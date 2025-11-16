//TODO Import Function

import {
  createProductValidation,
  updateProductValidation,
} from "../schema/productValidation.js";

//TODO Functions
const validateCreateProduct = (product) => {
  return createProductValidation.validate(product);
};
const validateUpdateProduct = (product) => {
  return updateProductValidation.validate(product);
};

//TODO Export
export { validateCreateProduct, validateUpdateProduct };
