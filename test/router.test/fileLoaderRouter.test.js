const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const fileLoaderRouter = require("../../routers/fileLoaderRouter"); // Corrected import

chai.use(chaiHttp);
const expect = chai.expect;

// Create a mock Express app
const app = express();

app.use('/fileLoader', fileLoaderRouter);

describe('File Loader Router', () => {
  it('should load sign-in page when GET / is called', (done) => {
    chai.request(app)
      .get('/fileLoader')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  it('should load sign-in page when GET /signIn.html is called', (done) => {
    chai.request(app)
      .get('/fileLoader/signIn.html')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  it('should load appointment page when GET /appointmentPage.html is called', (done) => {
    chai.request(app)
      .get('/fileLoader/appointmentPage.html')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  // Add more test cases for other routes similarly
});
