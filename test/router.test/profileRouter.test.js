const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const profileRouter = require("../../routers/profileRouter");

chai.use(chaiHttp);
const expect = chai.expect;

const app = express();

app.use('/profile', profileRouter);

describe('Profile Router', () => {
  it('should get all profiles when GET /allProfile is called', (done) => {
    chai.request(app)
      .get('/profile/allProfile')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should find profiles by username when GET /findAllByUserName is called', (done) => {
    chai.request(app)
      .get('/profile/findAllByUserName')
      .query({ username: 'testuser' }) // Assuming 'testuser' exists
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should find profile by app ID when GET /findProfileByAppId is called', (done) => {
    chai.request(app)
      .get('/profile/findProfileByAppId')
      .query({ appId: '123456' }) // Replace '123456' with a valid app ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should find profile by ID and delete when GET /findProfileByIdAndDelete is called', (done) => {
    chai.request(app)
      .get('/profile/findProfileByIdAndDelete')
      .query({ profileId: '123456' }) // Replace '123456' with a valid profile ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should submit new profile when POST /submitNewProfile is called', (done) => {
    const newProfile = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    chai.request(app)
      .post('/profile/submitNewProfile')
      .send(newProfile)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

});
