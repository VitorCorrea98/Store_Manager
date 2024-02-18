const schema = require('./schemas');

const productValidation = (product) => {
  const { error } = schema.productSchema.validate(product);
  if (error) return { status: 422, data: { message: error.message } };
  return null;
};

module.exports = {
  productValidation,
};
