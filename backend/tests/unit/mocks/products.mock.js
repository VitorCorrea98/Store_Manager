const productsFromDB = [
  {
    id: 1,
    name: 'Martelo',
  },
  {
    id: 2,
    name: 'Corda',
  },
];

const singleProduct = {
  id: 1,
  name: 'Vitao',
};

const productMissingName = {
  teste: 'teste',
};

const productWithName = {
  name: 'Vitor',
};

const productID = {
  id: 1,
};

const productWrongID = {
  id: 9999999,
};

module.exports = {
  productsFromDB,
  productMissingName,
  productWithName,
  productID,
  productWrongID,
  singleProduct,
};