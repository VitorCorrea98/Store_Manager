const conn = require('./connection');

const getAllProducts = async () => {
  const [products] = await conn.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const getProductByID = async (produtc) => {
  const [[response]] = await conn.execute('SELECT * FROM products WHERE id = ?', [produtc.id]);
  return response;
};

module.exports = {
  getAllProducts,
  getProductByID,
};