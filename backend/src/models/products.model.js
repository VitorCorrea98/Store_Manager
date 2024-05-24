const conn = require('./connection');

const getAllProducts = async () => {
  const [products] = await conn.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const getProductByID = async (product) => {
  const [[response]] = await conn.execute('SELECT * FROM products WHERE id = ?', [product.id]);
  return response;
};

const insertProduct = async (product) => {
  const [{ insertId }] = await conn.execute('INSERT INTO products(name) VALUES(?)', [product.name]);
  return insertId;
};

const updateProduct = async (product, id) => {
  const [response] = await conn
    .execute('UPDATE products SET name = ? WHERE id = ?', [product.name, id]);
  return response;
};

const deleteProduct = async (id) => conn.execute('DELETE FROM products WHERE id = ?', [id]);

module.exports = {
  getAllProducts,
  getProductByID,
  insertProduct,
  updateProduct,
  deleteProduct,
};