const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const scheduleRouter = require("../../routers/scheduleRouter");

chai.use(chaiHttp);
const expect = chai.expect;

// Create a mock Express app
const app = express();

app.use('/schedule', scheduleRouter);

describe('Schedule Router', () => {
  it('should get all schedules when POST /AllSchedule is called', (done) => {
    // Assuming you have a valid request body to fetch all schedules
    const requestBody = {
      // Your request body here
    };

    chai.request(app)
      .post('/schedule/AllSchedule')
      .send(requestBody)
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  // Add more test cases for other scenarios, such as error handling, etc.
});
