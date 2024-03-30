const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const sinon = require('sinon');

const profileModel = require('../../models/profile.model');
const profileService = require('../../service/profileService');

describe('Profile Service', () => {
  describe('createNewProfile', () => {
    it('should create a new profile with valid input', async () => {
      const newProfileJSON = {
        Profile: {
          userName: 'testUser',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          password: 'password123'
        }
      };

      const stubObjectId = sinon.stub(mongoose.Types, 'ObjectId').returns('mockedProfileId');

      const newProfile = await profileService.createNewProfile(newProfileJSON);

      expect(newProfile).to.be.an.instanceOf(profileModel);
      expect(newProfile.profileId).to.equal('mockedProfileId');
      expect(newProfile.userName).to.equal('testUser');

      stubObjectId.restore();
    });

    it('should set type to "admin" for specific email addresses', async () => {
      const adminProfileJSON = {
        Profile: {
          userName: 'adminUser',
          firstName: 'Admin',
          lastName: 'Doe',
          email: 'shiramar0401@gmail.com', // Admin email address
          password: 'admin123'
        }
      };

      const adminProfile = await profileService.createNewProfile(adminProfileJSON);

      expect(adminProfile.type).to.equal('admin');
    });

    it('should handle missing required fields gracefully', async () => {
      const invalidProfileJSON = {
      };

      const newProfile = await profileService.createNewProfile(invalidProfileJSON);

      expect(newProfile).to.be.an('error');
    });

  });

});
