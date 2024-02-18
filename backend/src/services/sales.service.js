const { salesModel } = require('../models');

const STATUS = {
  ok: 200,
  notFound: 404,
  inserted: 201,
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { status: STATUS.ok, data: sales };
};

const getSaleID = async (params) => {
  const sales = await salesModel.getIdSales(params);
  if (!sales.length) return { status: STATUS.notFound, data: { message: 'Sale not found' } };
  return { status: STATUS.ok, data: sales };
};

const insertSaleProduct = async (products) => {
  const saleId = await salesModel.insertSale();
  const test = Promise.all(await products
    .map((product) => salesModel.insertSaleProduct(product, saleId)));
  console.log({ test });
  const saleProduct = {
    id: saleId,
    itemsSold: products,
  };
  return { status: STATUS.inserted, data: saleProduct };
};

module.exports = {
  getAllSales,
  getSaleID,
  insertSaleProduct,
};