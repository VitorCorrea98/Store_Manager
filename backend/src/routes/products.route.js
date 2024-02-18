const route = require('express').Router();
const { productsController } = require('../controllers');
const { productMiddlewares } = require('../middlewares');

route.get('/', productsController.getAllProducts);
route.get('/:id', productsController.getProductsByID);
route.post('/', productMiddlewares.validateName, productsController.insertProduct);

module.exports = route;