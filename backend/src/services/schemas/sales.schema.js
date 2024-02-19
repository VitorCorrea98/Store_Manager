const Joi = require('joi');

const salesProductValidation = Joi.object({
  quantity: Joi.number().min(1).required(),
  productId: Joi.number().required(),
});

module.exports = {
  salesProductValidation,
};