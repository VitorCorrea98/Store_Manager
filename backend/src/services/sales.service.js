const { salesModel } = require('../models');

const STATUS = {
  ok: 200,
  notFound: 404,
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { status: STATUS.ok, data: sales };
};

const getSaleID = async (params) => {
  const sales = await salesModel.getIdSales(params);
  console.log({ sales });
  if (!sales.length) return { status: STATUS.notFound, data: { message: 'Sale not found' } };
  return { status: STATUS.ok, data: sales };
};

module.exports = {
  getAllSales,
  getSaleID,
};