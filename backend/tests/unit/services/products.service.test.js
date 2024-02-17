const { expect } = require('chai');
const sinon = require('sinon');
const { productsFromDB } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

describe('Realizando testes - PRODUCT SERVICE', function () { 
  it('Recuperando todos os produtos', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsFromDB);

    const responseService = await productsService.getAllProducts();
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(200);
    expect(responseService.data).to.deep.equal(productsFromDB);
  });
});