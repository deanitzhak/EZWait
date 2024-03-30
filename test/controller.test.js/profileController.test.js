const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const controller = require('../../controllers/userController.js');
const ProfileRepository = require('../../repository/profile.repository');
const profileService = require('../../service/profileService');
const profileModel = require('../../models/profile.model');

chai.use(chaiHttp);

describe('User Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get all profiles', async () => {
    const profiles = [{ id: 1 }, { id: 2 }];
    sinon.stub(ProfileRepository.prototype, 'find').resolves(profiles);
    const res = await chai.request(controller).get('/profiles');
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(profiles);
  });

  it('should find profiles by username', async () => {
    const userName = 'testUser';
    const profiles = [{ id: 1 }, { id: 2 }];
    sinon.stub(ProfileRepository.prototype, 'findByUserName').withArgs(userName).resolves(profiles);
    const res = await chai.request(controller).get(`/profiles/${userName}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(profiles);
  });

  it('should find profile by ID', async () => {
    const profileId = 'testId';
    const profile = { id: 1 };
    sinon.stub(ProfileRepository.prototype, 'findProfileByAppId').withArgs(profileId).resolves(profile);
    const res = await chai.request(controller).get(`/profiles/${profileId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(profile);
  });

  it('should delete profile by ID', async () => {
    const profileId = 'testId';
    sinon.stub(ProfileRepository.prototype, 'findByIdAndDelete').withArgs(profileId).resolves(true);
    const res = await chai.request(controller).delete(`/profiles/${profileId}`);
    expect(res).to.have.status(200);
    expect(res.text).to.equal('Deleted');
  });

  it('should find profiles by type', async () => {
    const type = 'testType';
    const profiles = [{ id: 1 }, { id: 2 }];
    sinon.stub(ProfileRepository.prototype, 'findByType').withArgs(type).resolves(profiles);
    const res = await chai.request(controller).get(`/profiles/type/${type}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(profiles);
  });

  it('should submit a new profile', async () => {
    const newProfile = { id: 1 };
    sinon.stub(profileService, 'createNewProfile').resolves(newProfile);
    sinon.stub(ProfileRepository.prototype, 'create').resolves(true);
    const res = await chai.request(controller).post('/profiles').send(newProfile);
    expect(res).to.have.status(200);
    expect(res.text).to.equal('New profile created successfully');
  });
});
