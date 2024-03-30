const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const sinon = require('sinon');

const profileModel = require('../../models/profile.model');
const profileService = require('../../service/profileService');

describe('Profile Service', () => {
  describe('createNewProfile', () => {
    it('should create a new profile with valid input', async () => {
      // Mock profile data
      const newProfileJSON = {
        Profile: {
          userName: 'testUser',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          password: 'password123'
        }
      };

      // Stub mongoose.Types.ObjectId to return a predefined value
      const stubObjectId = sinon.stub(mongoose.Types, 'ObjectId').returns('mockedProfileId');

      // Call the function
      const newProfile = await profileService.createNewProfile(newProfileJSON);

      // Assertions
      expect(newProfile).to.be.an.instanceOf(profileModel);
      expect(newProfile.profileId).to.equal('mockedProfileId');
      expect(newProfile.userName).to.equal('testUser');
      // Add more assertions based on expected profile properties

      // Restore the stub
      stubObjectId.restore();
    });

    it('should set type to "admin" for specific email addresses', async () => {
      // Mock profile data with admin email address
      const adminProfileJSON = {
        Profile: {
          userName: 'adminUser',
          firstName: 'Admin',
          lastName: 'Doe',
          email: 'shiramar0401@gmail.com', // Admin email address
          password: 'admin123'
        }
      };

      // Call the function with admin profile data
      const adminProfile = await profileService.createNewProfile(adminProfileJSON);

      // Assertions
      expect(adminProfile.type).to.equal('admin');
    });

    it('should handle missing required fields gracefully', async () => {
      // Mock profile data with missing required fields
      const invalidProfileJSON = {
        // Missing required fields
      };

      // Call the function with invalid input
      const newProfile = await profileService.createNewProfile(invalidProfileJSON);

      // Assertions
      expect(newProfile).to.be.an('error');
      // Add more assertions based on expected error handling
    });

    // Add more test cases for other scenarios
  });

  // Add more describe blocks for additional test scenarios such as Date and Time Handling, Mocking Dependencies, Database Interaction, Concurrency and Performance, Security, etc.
});
