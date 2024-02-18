const conn = require('./connection');

const getAllSales = async () => {
  const [sales] = await conn.execute(`
  SELECT 
  salp.sale_id AS "saleId",
  sal.date,
  salp.product_id AS "productId",
  salp.quantity
  FROM sales AS sal
  INNER JOIN sales_products AS salp
  ON sal.id = salp.sale_id
  ORDER BY salp.sale_id ASC;
  `);
  console.log({ sales });
  return sales;
};

const getIdSales = async (params) => {
  const [sales] = await conn.execute(`
  SELECT 
  sal.date,
  salp.product_id AS "productId",
  salp.quantity
  FROM sales AS sal
  INNER JOIN sales_products AS salp
  ON sal.id = salp.sale_id
  WHERE sal.id = ?
  ORDER BY salp.sale_id ASC;
  `, [params.id]);
  return sales;
};

module.exports = {
  getAllSales,
  getIdSales,
};