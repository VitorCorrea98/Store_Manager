const conn = require('./connection');

const getAllProducts = async () => {
  const [products] = await conn.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const getProductByID = async (produtc) => {
  const [[response]] = await conn.execute('SELECT * FROM products WHERE id = ?', [produtc.id]);
  return response;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await conn.execute('INSERT INTO products(name) VALUES(?)', [product.name]);
  return insertId;
};

module.exports = {
  getAllProducts,
  getProductByID,
  insertProduct,
};