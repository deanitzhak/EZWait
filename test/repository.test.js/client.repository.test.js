const chai = require('chai');
const sinon = require('sinon');
const ClientRepository = require('../../repository/client.repository');
const mongoose = require('mongoose');

const expect = chai.expect;

describe('ClientRepository', () => {
  let clientRepo;

  beforeEach(() => {
    // Mocking the model
    const MockModel = {
      findById: sinon.stub(),
      findByAttribute: sinon.stub(),
      find: sinon.stub(),
      findOne: sinon.stub(),
      create: sinon.stub(),
      save: sinon.stub()
    };

    clientRepo = new ClientRepository(MockModel);
  });

  describe('updateClientValue', () => {
    it('should update a client value with valid input', async () => {
      // Mock client data
      const clientId = 'mockedClientId';
      const key = 'mockedKey';
      const value = 'mockedValue';
      const updatedClient = { _id: clientId, [key]: value };

      // Stub the Model.findById method to return the client
      sinon.stub(clientRepo.Model, 'findById').returns(updatedClient);

      // Call the function
      const result = await clientRepo.updateClientValue(clientId, key, value);

      // Assertions
      expect(result).to.deep.equal(updatedClient);
      expect(result[key]).to.equal(value);
    });

    it('should throw an error if client is not found', async () => {
      // Mock client data
      const clientId = 'nonExistentClientId';
      const key = 'mockedKey';
      const value = 'mockedValue';

      // Stub the Model.findById method to return null (client not found)
      sinon.stub(clientRepo.Model, 'findById').returns(null);

      // Assertions
      await expect(clientRepo.updateClientValue(clientId, key, value)).to.be.rejectedWith('Client not found');
    });
  });

  describe('findByUserName', () => {
    it('should find clients by username', async () => {
      // Mock client data
      const userName = 'testUser';
      const clients = [{ _id: '1', userName: 'testUser' }, { _id: '2', userName: 'testUser' }];

      // Stub the findByAttribute method to return the clients
      sinon.stub(clientRepo, 'findByAttribute').returns(clients);

      // Call the function
      const result = await clientRepo.findByUserName(userName);

      // Assertions
      expect(result).to.deep.equal(clients);
    });
  });

  describe('findAll', () => {
    it('should find all clients', async () => {
      // Mock client data
      const clients = [{ _id: '1', userName: 'user1' }, { _id: '2', userName: 'user2' }];

      // Stub the find method to return the clients
      sinon.stub(clientRepo, 'find').returns(clients);

      // Call the function
      const result = await clientRepo.findAll();

      // Assertions
      expect(result).to.deep.equal(clients);
    });
  });

  // Add more describe blocks for other methods testing
});
