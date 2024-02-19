const Joi = require('joi');

const productName = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  productName,
};