const { productsModel } = require('../models');

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
  const insertId = await productsModel.insertProduct(product);
  const newProduct = {
    id: insertId,
    name: product.name,
  };
  return { status: STATUS.inserted, data: newProduct };
};

module.exports = {
  getAllProducts,
  getProductsByID,
  insertProduct,
};