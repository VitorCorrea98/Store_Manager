const { salesModel } = require('../models');

const STATUS = {
  ok: 200,
  notFound: 404,
  inserted: 201,
  deleted: 204,
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
  await Promise.all(await products
    .map((product) => salesModel.insertSaleProduct(product, saleId)));
  const saleProduct = {
    id: saleId,
    itemsSold: products,
  };
  return { status: STATUS.inserted, data: saleProduct };
};

const deleteSale = async (id) => {
  const findSale = await salesModel.getIdSales({ id });
  if (!findSale.length) return { status: STATUS.notFound, data: { message: 'Sale not found' } };

  await salesModel.deleteSale(id);
  return { status: STATUS.deleted };
};

module.exports = {
  getAllSales,
  getSaleID,
  insertSaleProduct,
  deleteSale,
};