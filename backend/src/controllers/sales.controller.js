const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const { status, data } = await salesService.getAllSales();
  return res.status(status).json(data);
};

const getSalesId = async (req, res) => {
  const { params } = req;
  const { status, data } = await salesService.getSaleID(params);
  return res.status(status).json(data);
};

const insertSaleProduct = async (req, res) => {
  const products = req.body;
  const { status, data } = await salesService.insertSaleProduct(products);
  return res.status(status).json(data);
};

module.exports = {
  getAllSales,
  getSalesId,
  insertSaleProduct,
};