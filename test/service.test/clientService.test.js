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
      // Mock client data
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

      // Stub mongoose.Types.ObjectId to return a predefined value
      const stubObjectId = sinon.stub(mongoose.Types, 'ObjectId').returns('mockedObjectId');

      // Call the function
      const newClient = await clientService.createNewClient(newClientJSON);

      // Assertions
      expect(newClient).to.be.an.instanceOf(clientModel);
      expect(newClient.clientId).to.equal('mockedObjectId');
      expect(newClient.userName).to.equal('testUser');
      // Add more assertions based on expected client properties

      // Restore the stub
      stubObjectId.restore();
    });

    it('should handle missing required fields gracefully', async () => {
      // Mock client data with missing required fields
      const invalidClientJSON = {
        // Missing required fields
      };

      // Call the function with invalid input
      const newClient = await clientService.createNewClient(invalidClientJSON);

      // Assertions
      expect(newClient).to.be.an('error');
      // Add more assertions based on expected error handling
    });

    // Add more test cases for other scenarios
  });

  // Add more describe blocks for additional test scenarios
});
