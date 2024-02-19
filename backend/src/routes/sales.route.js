const route = require('express').Router();
const { salesController } = require('../controllers');
const { salesMiddlewares } = require('../middlewares');

route.get('/', salesController.getAllSales);
route.get('/:id', salesController.getSalesId);
route.post(
  '/', 
  salesMiddlewares.checkForKeys,
  salesMiddlewares.checkIfProductIdExists,
  salesController.insertSaleProduct,
);

route.delete('/:id', salesController.deleteSale);

module.exports = route;