const chai = require('chai');
const sinon = require('sinon');
const ProfileRepository = require('../../repository/profile.repository');
const mongoose = require('mongoose');

const expect = chai.expect;

describe('ProfileRepository', () => {
  let profileRepo;

  beforeEach(() => {
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
      const profileData = {
        userName: 'testUser',
        firstName: 'John',
        lastName: 'Doe'
      };
      const newProfile = { _id: 'mockedProfileId', ...profileData };

      sinon.stub(profileRepo.Model, 'create').returns(newProfile);

      const result = await profileRepo.createNewProfile(profileData);

      expect(result).to.deep.equal(newProfile);
    });

    it('should throw an error if profile creation fails', async () => {
      const profileData = {
        userName: 'testUser',
        firstName: 'John',
        lastName: 'Doe'
      };

      sinon.stub(profileRepo.Model, 'create').throws('Error creating profile');

      await expect(profileRepo.createNewProfile(profileData)).to.be.rejectedWith('Error creating user');
    });
  });

  describe('updateProfileValue', () => {
    it('should update a profile value with valid input', async () => {
      const profileId = 'mockedProfileId';
      const key = 'firstName';
      const value = 'Jane';
      const updatedProfile = { _id: profileId, userName: 'testUser', firstName: 'Jane', lastName: 'Doe' };

      sinon.stub(profileRepo.Model, 'findById').returns(updatedProfile);

      const result = await profileRepo.updateProfileValue(profileId, key, value);

      expect(result).to.deep.equal(updatedProfile);
      expect(result[key]).to.equal(value);
    });

    it('should throw an error if profile is not found', async () => {
      const profileId = 'nonExistentProfileId';
      const key = 'firstName';
      const value = 'Jane';

      sinon.stub(profileRepo.Model, 'findById').returns(null);

      await expect(profileRepo.updateProfileValue(profileId, key, value)).to.be.rejectedWith('Profile not found');
    });
  });

  describe('findByUserName', () => {
    it('should find profiles by username', async () => {
      const userName = 'testUser';
      const profile = { _id: '1', userName: 'testUser', firstName: 'John', lastName: 'Doe' };

      sinon.stub(profileRepo, 'findByAttribute').returns(profile);

      const result = await profileRepo.findByUserName(userName);

      expect(result).to.deep.equal(profile);
    });
  });

  describe('findAll', () => {
    it('should find all profiles', async () => {
      const profiles = [{ _id: '1', userName: 'user1', firstName: 'John', lastName: 'Doe' }, { _id: '2', userName: 'user2', firstName: 'Jane', lastName: 'Doe' }];

      sinon.stub(profileRepo, 'find').returns(profiles);

      const result = await profileRepo.findAll();

      expect(result).to.deep.equal(profiles);
    });
  });

});
