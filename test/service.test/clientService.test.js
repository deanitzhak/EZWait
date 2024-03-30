const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const clientService = require('../../service/clientService');
const clientModel = require('../../models/client.model');

const expect = chai.expect;

describe('Client Service', () => {
  describe('createNewClient', () => {
    afterEach(() => {
      sinon.restore(); // Restore sinon stubs after each test
    });

    it('should create a new client with valid input', async () => {
      const newClientJSON = {
        Client: {
          userName: 'testUser',
          dateOfBirth: '1990-01-01',
          gender: 'Male',
          phone: '1234567890',
          address: '123 Test St',
          subfirstName: 'SubFirst',
          sublastName: 'SubLast',
          subgender: 'Female',
          subdateOfBirth: '2020-01-01'
        }
      };

      const stubObjectId = sinon.stub(mongoose.Types, 'ObjectId').returns('mockedObjectId');

      const newClient = await clientService.createNewClient(newClientJSON);

      expect(newClient).to.be.an.instanceOf(clientModel);
      expect(newClient.clientId).to.equal('mockedObjectId');
      expect(newClient.userName).to.equal('testUser');

      stubObjectId.restore();
    });

    it('should handle missing required fields gracefully', async () => {
      const invalidClientJSON = {
      };

      const newClient = await clientService.createNewClient(invalidClientJSON);

      expect(newClient).to.be.an('error');
    });

  });

});
