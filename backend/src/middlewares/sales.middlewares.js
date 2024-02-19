const { productsModel } = require('../models');
const { salesValidation } = require('../services/validations');

const checkForKeys = async (req, res, next) => {
  const products = req.body;
  const error = products.map((product) => salesValidation
    .saleProductKeysValidation(product))
    .filter((err) => err);

  if (error.length) {
    const findError = error.find((err) => err.status);
    return res.status(findError.status).json(findError.data);
  }
  return next();
};

const checkIfProductIdExists = async (req, res, next) => {
  const products = req.body;
  const findProduct = await Promise.all(products
    .map(async (product) => productsModel.getProductByID({ id: product.productId })));
  const checkProductUndefined = findProduct.filter((product) => product === undefined);
  if (checkProductUndefined.length) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = {
  checkForKeys,
  checkIfProductIdExists,
};