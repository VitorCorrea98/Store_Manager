const { expect } = require('chai');
const sinon = require('sinon');
const { productsFromDB } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('Realizando testes - PRODUCT SERVICE', function () { 
  it('Recuperando um unico produto', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves({ status: 200, data: productsFromDB });

    const responseService = await productsService.getAllProducts();
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(200);
    expect(responseService.data).to.deep.equal(productsFromDB);
  });
});