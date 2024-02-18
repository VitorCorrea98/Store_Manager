const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.getAllProducts);
route.get('/:id', productsController.getProductsByID);
route.post('/', productsController.insertProduct);

module.exports = route;