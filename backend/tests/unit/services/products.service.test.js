const { expect } = require('chai');
const sinon = require('sinon');
const { productsMock } = require('../mocks');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

describe('Realizando testes - PRODUCT SERVICE', function () { 
  it('Recuperando todos os produtos', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(productsMock.productsFromDB);

    const responseService = await productsService.getAllProducts();
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(200);
    expect(responseService.data).to.deep.equal(productsMock.productsFromDB);
  });

  it('Recuperando apenas um unico produto', async function () {
    sinon.stub(productsModel, 'getProductByID').resolves(productsMock.singleProduct);

    const responseService = await productsService.getProductsByID(productsMock.productID);
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(200);
    expect(responseService.data).to.deep.equal(productsMock.singleProduct);
  });

  it('Não achando nenhum produto', async function () {
    sinon.stub(productsModel, 'getProductByID').resolves(null);

    const responseService = await productsService.getProductsByID(productsMock.productWrongID);
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Cadastra um produto com sucesso', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(4);
    const newProduct = {
      name: 'teste',
    };

    const responseService = await productsService.insertProduct(newProduct);
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.be.equal(201);
    expect(responseService.data).to.haveOwnProperty('id', 4);
    expect(responseService.data).to.haveOwnProperty('name', 'teste');
  });

  it('Cadastra um produto com fracasso', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(4);
    const newProduct = {
      name: 'fail',
    };

    const responseService = await productsService.insertProduct(newProduct);
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.be.equal(422);
    expect(responseService.data).to.haveOwnProperty('message', '"name" length must be at least 5 characters long');
  });
  
  afterEach(function () {
    sinon.restore();
  });
});