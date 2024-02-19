const { salesSchema } = require('../schemas');

const saleProductKeysValidation = (saleProduct) => {
  const { error } = salesSchema.salesProductValidation.validate(saleProduct);
  
  if (error && error.message.includes('required')) {
    return { 
      status: 400, data: { message: error.message } }; 
  }
  if (error && error.message.includes('equal')) {
    return { 
      status: 422, data: { message: error.message } }; 
  }
};

module.exports = {
  saleProductKeysValidation,
};