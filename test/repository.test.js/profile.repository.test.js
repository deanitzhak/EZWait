const chai = require('chai');
const sinon = require('sinon');
const ProfileRepository = require('../../repository/profile.repository');
const mongoose = require('mongoose');

const expect = chai.expect;

describe('ProfileRepository', () => {
  let profileRepo;

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

    profileRepo = new ProfileRepository(MockModel);
  });

  describe('createNewProfile', () => {
    it('should create a new profile with valid input', async () => {
      // Mock profile data
      const profileData = {
        userName: 'testUser',
        firstName: 'John',
        lastName: 'Doe'
      };
      const newProfile = { _id: 'mockedProfileId', ...profileData };

      // Stub the Model.create method to return the new profile
      sinon.stub(profileRepo.Model, 'create').returns(newProfile);

      // Call the function
      const result = await profileRepo.createNewProfile(profileData);

      // Assertions
      expect(result).to.deep.equal(newProfile);
    });

    it('should throw an error if profile creation fails', async () => {
      // Mock profile data
      const profileData = {
        userName: 'testUser',
        firstName: 'John',
        lastName: 'Doe'
      };

      // Stub the Model.create method to throw an error
      sinon.stub(profileRepo.Model, 'create').throws('Error creating profile');

      // Assertions
      await expect(profileRepo.createNewProfile(profileData)).to.be.rejectedWith('Error creating user');
    });
  });

  describe('updateProfileValue', () => {
    it('should update a profile value with valid input', async () => {
      // Mock profile data
      const profileId = 'mockedProfileId';
      const key = 'firstName';
      const value = 'Jane';
      const updatedProfile = { _id: profileId, userName: 'testUser', firstName: 'Jane', lastName: 'Doe' };

      // Stub the Model.findById method to return the profile
      sinon.stub(profileRepo.Model, 'findById').returns(updatedProfile);

      // Call the function
      const result = await profileRepo.updateProfileValue(profileId, key, value);

      // Assertions
      expect(result).to.deep.equal(updatedProfile);
      expect(result[key]).to.equal(value);
    });

    it('should throw an error if profile is not found', async () => {
      // Mock profile data
      const profileId = 'nonExistentProfileId';
      const key = 'firstName';
      const value = 'Jane';

      // Stub the Model.findById method to return null (profile not found)
      sinon.stub(profileRepo.Model, 'findById').returns(null);

      // Assertions
      await expect(profileRepo.updateProfileValue(profileId, key, value)).to.be.rejectedWith('Profile not found');
    });
  });

  describe('findByUserName', () => {
    it('should find profiles by username', async () => {
      // Mock profile data
      const userName = 'testUser';
      const profile = { _id: '1', userName: 'testUser', firstName: 'John', lastName: 'Doe' };

      // Stub the findByAttribute method to return the profile
      sinon.stub(profileRepo, 'findByAttribute').returns(profile);

      // Call the function
      const result = await profileRepo.findByUserName(userName);

      // Assertions
      expect(result).to.deep.equal(profile);
    });
  });

  describe('findAll', () => {
    it('should find all profiles', async () => {
      // Mock profile data
      const profiles = [{ _id: '1', userName: 'user1', firstName: 'John', lastName: 'Doe' }, { _id: '2', userName: 'user2', firstName: 'Jane', lastName: 'Doe' }];

      // Stub the find method to return the profiles
      sinon.stub(profileRepo, 'find').returns(profiles);

      // Call the function
      const result = await profileRepo.findAll();

      // Assertions
      expect(result).to.deep.equal(profiles);
    });
  });

  // Add more describe blocks for other methods testing
});
