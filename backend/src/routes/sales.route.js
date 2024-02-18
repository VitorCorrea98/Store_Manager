const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.getAllSales);
route.get('/:id', salesController.getSalesId);

module.exports = route;