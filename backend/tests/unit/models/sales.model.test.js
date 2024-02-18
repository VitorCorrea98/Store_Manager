const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesMock } = require('../mocks');
const { salesModel } = require('../../../src/models');

describe('Realizando testes - SALES MODEL', function () { 
  it('Recuperando sales com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.AllSales]);

    const sales = await salesModel.getAllSales();
    expect(sales).to.be.an('array');
  });

  it('Recuperando sales de ID 1', async function () {
    const sales = salesMock.salesID1;

    sinon.stub(connection, 'execute').resolves([sales]);

    const salesID = {
      id: 1,
    };
    const modelResponse = await salesModel.getIdSales(salesID);
    expect(modelResponse).to.be.an('array');
    expect(modelResponse).to.have.length(2);
  });

  afterEach(function () {
    sinon.restore();
  });
});