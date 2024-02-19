const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsMock } = require('../mocks');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

chai.use(sinonChai);

describe('Realizando testes - PRODUCT CONTROLLER', function () { 
  it('Recuperando products com sucesso', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves({ status: 200, data: productsMock.productsFromDB });

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(null, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock.productsFromDB);
  });

  it('Recuperando um unico produto com ID valido', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves({ status: 200, data: productsMock.singleProduct });

    const req = {
      params: { id: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock.singleProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});