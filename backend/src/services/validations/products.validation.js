const { productsSchema } = require('../schemas');

const productValidation = (product) => {
  const { error } = productsSchema.productName.validate(product);
  if (error) return { status: 422, data: { message: error.message } };
  return null;
};

module.exports = {
  productValidation,
};
