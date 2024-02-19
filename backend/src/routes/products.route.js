const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getAllProducts);
route.get('/:id', productsController.getProductsByID);
route.post('/', productsController.insertProduct);
route.put('/:id', productsController.updateProduct);

module.exports = route;