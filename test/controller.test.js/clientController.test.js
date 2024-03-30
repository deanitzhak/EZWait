const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const controller = require('../../controllers/clientController.js');
const clientRepository = require('../../repository/client.repository.js');
const clientService = require('../../service/clientService.js');

chai.use(chaiHttp);

describe('Client Controller', () => {
  afterEach(() => {
    sinon.restore(); // Restore all mocked methods after each test
  });

  it('should get all clients', async () => {
    const clients = [{ id: 1 }, { id: 2 }];
    sinon.stub(clientRepository.prototype, 'find').resolves(clients);
    const res = await chai.request(controller).get('/clients');
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(clients);
  });

  it('should find clients by username', async () => {
    const userName = 'testUser';
    const clients = [{ id: 1 }, { id: 2 }];
    sinon.stub(clientRepository.prototype, 'findByUserName').withArgs(userName).resolves(clients);
    const res = await chai.request(controller).get(`/clients/${userName}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(clients);
  });

  it('should find client by ID', async () => {
    const clientId = 'testId';
    const client = { id: 1 };
    sinon.stub(clientRepository.prototype, 'findClientByAppId').withArgs(clientId).resolves(client);
    const res = await chai.request(controller).get(`/clients/${clientId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(client);
  });

  it('should delete client by ID', async () => {
    const clientId = 'testId';
    sinon.stub(clientRepository.prototype, 'findByIdAndDelete').withArgs(clientId).resolves(true);
    const res = await chai.request(controller).delete(`/clients/${clientId}`);
    expect(res).to.have.status(200);
    expect(res.text).to.equal('Deleted');
  });

  it('should find clients by status', async () => {
    const status = 'testStatus';
    const clients = [{ id: 1 }, { id: 2 }];
    sinon.stub(clientRepository.prototype, 'findByStatus').withArgs(status).resolves(clients);
    const res = await chai.request(controller).get(`/clients/status/${status}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(clients);
  });

  it('should submit a new client', async () => {
    const newClient = { id: 1 };
    sinon.stub(clientService, 'createNewClient').resolves(newClient);
    sinon.stub(clientRepository.prototype, 'create').resolves(true);
    const res = await chai.request(controller).post('/clients').send(newClient);
    expect(res).to.have.status(200);
    expect(res.text).to.equal('New client created successfully');
  });

  it('should update a client status', async () => {
    const clientId = 'testId';
    sinon.stub(clientRepository.prototype, 'updateClientStatus').resolves(true);
    const res = await chai.request(controller).put(`/clients/${clientId}`).send({ _id: clientId });
    expect(res).to.have.status(200);
    expect(res.body).to.equal(true);
  });
});
