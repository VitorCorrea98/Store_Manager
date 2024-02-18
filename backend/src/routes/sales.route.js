const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.getAllSales);
route.get('/:id', salesController.getSalesId);
route.post('/', salesController.insertSaleProduct);

module.exports = route;