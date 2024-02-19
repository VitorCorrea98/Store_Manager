const conn = require('./connection');

const getAllProducts = async () => {
  const [products] = await conn.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const getProductByID = async (product) => {
  const [[response]] = await conn.execute('SELECT * FROM products WHERE id = ?', [product.id]);
  console.log({ product, response });
  return response;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await conn.execute('INSERT INTO products(name) VALUES(?)', [product.name]);
  return insertId;
};

const updateProduct = async (product, id) => {
  const [response] = await conn
    .execute('UPDATE products SET name = ? WHERE id = ?', [product.name, id]);
  console.log({ response });
  return response;
};
module.exports = {
  getAllProducts,
  getProductByID,
  insertProduct,
  updateProduct,
};