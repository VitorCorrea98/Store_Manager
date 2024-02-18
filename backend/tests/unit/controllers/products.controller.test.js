const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsMock } = require('../mocks');
const { productsModel } = require('../../../src/models');

describe('Realizando testes - PRODUCT CONTROLLER', function () { 
  it('Recuperando products com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock.productsFromDB]);

    const products = await productsModel.getAllProducts();
    expect(products).to.be.an('array');
  });

  it('Recuperando um único produto', async function () {
    const product = productsMock.productsFromDB[0];

    sinon.stub(connection, 'execute').resolves([[product]]);

    const modelResponse = await productsModel.getProductByID(product);
    expect(modelResponse).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});