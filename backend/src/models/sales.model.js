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

const insertSale = async () => {
  const [{ insertId }] = await conn.execute('INSERT INTO sales(date) VALUES(CURRENT_TIMESTAMP())');
  return insertId;
};

const insertSaleProduct = async (product, saleID) => {
  const [teste] = await conn.execute(`
  INSERT INTO sales_products(sale_id, product_id, quantity)
    VALUES (?, ?, ?)`, [saleID, product.productId, product.quantity]);
  return teste;
};

module.exports = {
  getAllSales,
  getIdSales,
  insertSale,
  insertSaleProduct,
};