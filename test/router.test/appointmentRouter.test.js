const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const appointmentRouter = require('../../routers/appointmentRouter'); // Adjust the path as needed
const expect = chai.expect;

chai.use(chaiHttp);

describe('Appointment API Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use('/appointments', appointmentRouter);
  });

  it('should return all appointments when GET /allAppointment is called', (done) => {
    chai.request(app)
      .get('/appointments/allAppointment')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

});
