const { expect } = require('chai');
const sinon = require('sinon');
const { productsMock } = require('../mocks');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productValidations } = require('../../../src/services/validations');

const notFound = 'Product not found';

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
    expect(responseService.data).to.deep.equal({ message: notFound });
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
      teste: 'Vitao',
    };

    const serviceResponse = await productsService.insertProduct(newProduct); 

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse).to.haveOwnProperty('status', 400);
    expect(serviceResponse).to.haveOwnProperty('data');
    expect(serviceResponse.data).to.haveOwnProperty('message', '"name" is required');
  });

  it('Edita um produto', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(null);
    sinon.stub(productsModel, 'getProductByID').resolves({ id: 2, name: 'Vitao' });
    sinon.stub(productValidations, 'checkForProdctExisting').resolves(null);

    const newProduct = {
      name: 'Vitao',
    };

    const serviceResponse = await productsService.updateProduct(newProduct, 2);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse).to.haveOwnProperty('status', 200);
    expect(serviceResponse).to.haveOwnProperty('data');
    expect(serviceResponse.data).to.haveOwnProperty('id', 2);
    expect(serviceResponse.data).to.haveOwnProperty('name', 'Vitao');
  });

  it('Edita um produto sem a chave name', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(null);
    sinon.stub(productsModel, 'getProductByID').resolves({ id: 2, name: 'Vitao' });
    sinon.stub(productValidations, 'checkForProdctExisting').resolves(null);

    const newProduct = {
      teste: 'Vitao',
    };

    const serviceResponse = await productsService.updateProduct(newProduct, 2);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse).to.haveOwnProperty('status', 400);
    expect(serviceResponse).to.haveOwnProperty('data');
    expect(serviceResponse.data).to.haveOwnProperty('message', '"name" is required');
  });

  it('Edita um produto com a chave name com menos de 5 caracteres', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(null);
    sinon.stub(productsModel, 'getProductByID').resolves({ id: 2, name: 'Vitao' });
    sinon.stub(productValidations, 'checkForProdctExisting').resolves(null);

    const newProduct = {
      name: 'Vi',
    };

    const serviceResponse = await productsService.updateProduct(newProduct, 2);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse).to.haveOwnProperty('status', 422);
    expect(serviceResponse).to.haveOwnProperty('data');
    expect(serviceResponse.data).to.haveOwnProperty('message', '"name" length must be at least 5 characters long');
  });

  it('Edita um produto com a chave name com um ID não existente', async function () {
    sinon.stub(productsModel, 'updateProduct').resolves(null);
    sinon.stub(productsModel, 'getProductByID').resolves({ id: 2, name: 'Vitao' });
    sinon.stub(productValidations, 'checkForProdctExisting').resolves({ status: 404, data: { message: notFound } });

    const newProduct = {
      name: 'Vitao',
    };

    const serviceResponse = await productsService.updateProduct(newProduct, 99);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse).to.haveOwnProperty('status', 404);
    expect(serviceResponse).to.haveOwnProperty('data');
    expect(serviceResponse.data).to.haveOwnProperty('message', notFound);
  });

  it('Deleta um produto com ID existente', async function () {
    sinon.stub(productValidations, 'checkForProdctExisting').resolves(null);
    sinon.stub(productsModel, 'deleteProduct').resolves();
    
    const serviceResponse = await productsService.deleteProduct(2);

    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse).to.haveOwnProperty('status', 204);
    expect(serviceResponse).to.not.haveOwnProperty('data');
  });

  it('Deleta um produto com ID inexistente', async function () {
    sinon.stub(productValidations, 'checkForProdctExisting').resolves({ status: 404, data: { message: notFound } });
    
    const serviceResponse = await productsService.deleteProduct(99);
    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse).to.haveOwnProperty('status', 404);
    expect(serviceResponse).to.haveOwnProperty('data');
    expect(serviceResponse.data).to.haveOwnProperty('message', notFound);
  });

  it('Check validations delete do produto', async function () {
    sinon.stub(productsModel, 'getProductByID').resolves(null);
    
    const serviceResponse = await productValidations.checkForProdctExisting(99);
    expect(serviceResponse).to.be.an('object');
    expect(serviceResponse).to.haveOwnProperty('status', 404);
    expect(serviceResponse).to.haveOwnProperty('data');
    expect(serviceResponse.data).to.haveOwnProperty('message', notFound);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});