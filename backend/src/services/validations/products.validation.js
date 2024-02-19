const { productsModel } = require('../../models');
const { productsSchema } = require('../schemas');

const productValidation = (product) => {
  const { error } = productsSchema.productName.validate(product);
  if (error && error.message.includes('long')) {
    return { status: 422, data: { message: error.message } }; 
  } 
  if (error && error.message.includes('required')) {
    return { status: 400, data: { message: error.message } }; 
  }
};

const checkForProdctExisting = async (id) => {
  const findProduct = await productsModel.getProductByID(id);
  if (!findProduct) return { status: 404, data: { message: 'Product not found' } };
};

module.exports = {
  productValidation,
  checkForProdctExisting,
};
