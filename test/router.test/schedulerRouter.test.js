const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const schedulerRouter = require("../../routers/schedulerRouter");

chai.use(chaiHttp);
const expect = chai.expect;

const app = express();

app.use('/scheduler', schedulerRouter);

describe('Scheduler Router', () => {
  it('should schedule a new appointment when GET /scheduleNewAppointment is called', (done) => {
    chai.request(app)
      .get('/scheduler/scheduleNewAppointment')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  it('should reschedule an appointment when POST /reScheduleNewAppointment is called', (done) => {
    chai.request(app)
      .post('/scheduler/reScheduleNewAppointment')
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  it('should cancel an appointment by ID when POST /cancelAppointmentById is called', (done) => {
    chai.request(app)
      .post('/scheduler/cancelAppointmentById')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

});
