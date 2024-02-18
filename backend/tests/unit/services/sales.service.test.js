const { expect } = require('chai');
const sinon = require('sinon');
const { salesMock } = require('../mocks');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');

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

  afterEach(function () {
    sinon.restore();
  });
});