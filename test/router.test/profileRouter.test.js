const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const profileRouter = require("../../routers/profileRouter");

chai.use(chaiHttp);
const expect = chai.expect;

// Create a mock Express app
const app = express();

// Mount the profileRouter on the app
app.use('/profile', profileRouter);

describe('Profile Router', () => {
  it('should get all profiles when GET /allProfile is called', (done) => {
    chai.request(app)
      .get('/profile/allProfile')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  it('should find profiles by username when GET /findAllByUserName is called', (done) => {
    chai.request(app)
      .get('/profile/findAllByUserName')
      .query({ username: 'testuser' }) // Assuming 'testuser' exists
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  it('should find profile by app ID when GET /findProfileByAppId is called', (done) => {
    chai.request(app)
      .get('/profile/findProfileByAppId')
      .query({ appId: '123456' }) // Replace '123456' with a valid app ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  it('should find profile by ID and delete when GET /findProfileByIdAndDelete is called', (done) => {
    chai.request(app)
      .get('/profile/findProfileByIdAndDelete')
      .query({ profileId: '123456' }) // Replace '123456' with a valid profile ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  it('should submit new profile when POST /submitNewProfile is called', (done) => {
    const newProfile = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      // Add other required fields for a new profile
    };

    chai.request(app)
      .post('/profile/submitNewProfile')
      .send(newProfile)
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  // Add more test cases for other routes similarly
});
