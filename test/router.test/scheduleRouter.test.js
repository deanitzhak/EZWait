const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const scheduleRouter = require("../../routers/scheduleRouter");

chai.use(chaiHttp);
const expect = chai.expect;

const app = express();

app.use('/schedule', scheduleRouter);

describe('Schedule Router', () => {
  it('should get all schedules when POST /AllSchedule is called', (done) => {
    const requestBody = {
    };
    chai.request(app)
      .post('/schedule/AllSchedule')
      .send(requestBody)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
