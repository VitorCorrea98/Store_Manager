const { expect } = require('chai');
const sinon = require('sinon');
const { salesMock } = require('../mocks');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { salesValidation } = require('../../../src/services/validations');

describe('Realizando testes - SALES SERVICE', function () { 
  it('Recuperando todas as sales', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(salesMock.AllSales);

    const responseService = await salesService.getAllSales();
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(200);
    expect(responseService.data).to.deep.equal(salesMock.AllSales);
  });

  it('Recuperando saled de ID 1', async function () {
    sinon.stub(salesModel, 'getIdSales').resolves(salesMock.salesID1);

    const salesID = {
      id: 1,
    };

    const responseService = await salesService.getSaleID(salesID);
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(200);
    expect(responseService.data).to.deep.equal(salesMock.salesID1);
  });

  it('Não achando nenhuma sale', async function () {
    sinon.stub(salesModel, 'getIdSales').resolves([]);

    const wrongID = {
      id: 22,
    };

    const responseService = await salesService.getSaleID(wrongID);
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(404);
    expect(responseService.data).to.deep.equal({ message: 'Sale not found' });
  });

  it('Testando sales', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(3);
    sinon.stub(salesModel, 'insertSaleProduct').resolves(3);

    const responseService = await salesService.insertSaleProduct([{ productId: 2, quantity: 4 }]);
    expect(responseService).to.be.an('object');
    expect(responseService.status).to.deep.equal(201);
    expect(responseService.data).to.haveOwnProperty('id', 3);
    expect(responseService.data.itemsSold).to.have.lengthOf(1);
  });

  it('Testando a validação das keys de salesProducts, chamada correta', function () {
    const validationResponse = salesValidation.saleProductKeysValidation({ productId: 2, quantity: 4 });
    
    expect(validationResponse).to.be.equal(undefined);
  });

  it('Testando a validação das keys de salesProducts, chamada incorreta sem productId', function () {
    const validationResponse = salesValidation.saleProductKeysValidation({ teste: 2, quantity: 4 });
    
    expect(validationResponse).to.be.an('object');
    expect(validationResponse).to.haveOwnProperty('status', 400);
    expect(validationResponse).to.haveOwnProperty('data');
    expect(validationResponse.data).to.haveOwnProperty('message', '"productId" is required');
  });

  it('Testando a validação das keys de salesProducts, chamada incorreta sem quantity', function () {
    const validationResponse = salesValidation.saleProductKeysValidation({ productId: 2, test: 4 });
    
    expect(validationResponse).to.be.an('object');
    expect(validationResponse).to.haveOwnProperty('status', 400);
    expect(validationResponse).to.haveOwnProperty('data');
    expect(validationResponse.data).to.haveOwnProperty('message', '"quantity" is required');
  });

  it('Testando a validação das keys de salesProducts, chamada incorreta com quantity menor que 1', function () {
    const validationResponse = salesValidation.saleProductKeysValidation({ productId: 2, quantity: 0 });
    
    expect(validationResponse).to.be.an('object');
    expect(validationResponse).to.haveOwnProperty('status', 422);
    expect(validationResponse).to.haveOwnProperty('data');
    expect(validationResponse.data).to.haveOwnProperty('message', '"quantity" must be greater than or equal to 1');
  });

  afterEach(function () {
    sinon.restore();
  });
});