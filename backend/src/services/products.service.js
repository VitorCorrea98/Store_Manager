const { productsModel } = require('../models');
const { productValidations } = require('./validations');

const STATUS = {
  ok: 200,
  notFound: 404,
  inserted: 201,
};

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { status: STATUS.ok, data: products };
};

const getProductsByID = async (product) => {
  const responseOBJ = await productsModel.getProductByID(product);
  
  if (!responseOBJ) return { status: STATUS.notFound, data: { message: 'Product not found' } };

  return { status: STATUS.ok, data: responseOBJ };
};

const insertProduct = async (product) => {
  const error = productValidations.productValidation(product);
  if (error) return { status: error.status, data: error.data };

  const insertId = await productsModel.insertProduct(product);

  const newProduct = {
    id: insertId,
    name: product.name,
  };
  return { status: STATUS.inserted, data: newProduct };
};

const updateProduct = async (product, id) => {
  const error = productValidations.productValidation(product);
  if (error) return { status: error.status, data: error.data };

  const noProduct = await productValidations.checkForProdctExisting({ id });
  if (noProduct) return { status: noProduct.status, data: noProduct.data };

  await productsModel.updateProduct(product, id);
  const updatedProduct = await productsModel.getProductByID({ id });

  return { status: 200, data: updatedProduct };
};

module.exports = {
  getAllProducts,
  getProductsByID,
  insertProduct,
  updateProduct,
};