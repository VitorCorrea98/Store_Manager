const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productsService.getAllProducts();
  return res.status(status).json(data);
};

const getProductsByID = async (req, res) => {
  const product = req.params;
  const { status, data } = await productsService.getProductsByID(product);
  return res.status(status).json(data);
};

const insertProduct = async (req, res) => {
  const product = req.body;
  const { status, data } = await productsService.insertProduct(product);
  return res.status(status).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  
  const { status, data } = await productsService.updateProduct(product, id);
  return res.status(status).json(data);
};

module.exports = {
  getAllProducts,
  getProductsByID,
  insertProduct,
  updateProduct,
};