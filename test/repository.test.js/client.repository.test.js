const chai = require('chai');
const sinon = require('sinon');
const ClientRepository = require('../../repository/client.repository');
const mongoose = require('mongoose');

const expect = chai.expect;

describe('ClientRepository', () => {
  let clientRepo;

  beforeEach(() => {
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
      const clientId = 'mockedClientId';
      const key = 'mockedKey';
      const value = 'mockedValue';
      const updatedClient = { _id: clientId, [key]: value };

      sinon.stub(clientRepo.Model, 'findById').returns(updatedClient);

      const result = await clientRepo.updateClientValue(clientId, key, value);

      expect(result).to.deep.equal(updatedClient);
      expect(result[key]).to.equal(value);
    });

    it('should throw an error if client is not found', async () => {
      const clientId = 'nonExistentClientId';
      const key = 'mockedKey';
      const value = 'mockedValue';

      sinon.stub(clientRepo.Model, 'findById').returns(null);

      await expect(clientRepo.updateClientValue(clientId, key, value)).to.be.rejectedWith('Client not found');
    });
  });

  describe('findByUserName', () => {
    it('should find clients by username', async () => {
      const userName = 'testUser';
      const clients = [{ _id: '1', userName: 'testUser' }, { _id: '2', userName: 'testUser' }];

      sinon.stub(clientRepo, 'findByAttribute').returns(clients);

      const result = await clientRepo.findByUserName(userName);

      expect(result).to.deep.equal(clients);
    });
  });

  describe('findAll', () => {
    it('should find all clients', async () => {
      const clients = [{ _id: '1', userName: 'user1' }, { _id: '2', userName: 'user2' }];

      sinon.stub(clientRepo, 'find').returns(clients);

      const result = await clientRepo.findAll();

      expect(result).to.deep.equal(clients);
    });
  });

});
