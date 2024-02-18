const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsMock } = require('../mocks');
const { productsModel } = require('../../../src/models');

describe('Realizando testes - PRODUCT MODEL', function () { 
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

  it('Fazendo o insert de um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const newProduct = {
      name: 'teste',
    };

    const modelResponse = await productsModel.insertProduct(newProduct);
    expect(modelResponse).to.deep.equal(4);
  });

  afterEach(function () {
    sinon.restore();
  });
});