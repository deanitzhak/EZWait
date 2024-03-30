const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const express = require('express');

const app = express(); // Create an Express app instance
const controller = require('../../controllers/appointmentController.js');
const appRepo = require('../../repository/appointment.repository.js');
const appointmentService = require('../../service/appoinmentService.js');

chai.use(chaiHttp);

describe('Appointment Controller', () => {
  afterEach(() => {
    sinon.restore(); // Restore all mocked methods after each test
  });

  it('should get all appointments', async () => {
    const appointments = [{ id: 1 }, { id: 2 }];
    sinon.stub(appRepo.prototype, 'findAll').resolves(appointments);
    const res = await chai.request(app).get('/appointments');
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(appointments);
  });

  it('should find appointments by username', async () => {
    const userName = 'testUser';
    const appointments = [{ id: 1 }, { id: 2 }];
    sinon.stub(appRepo.prototype, 'findByUserName').withArgs(userName).resolves(appointments);
    const res = await chai.request(app).get(`/appointments/${userName}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(appointments);
  });

  it('should find appointment by ID', async () => {
    const appointmentId = 'testId';
    const appointment = { id: 1 };
    sinon.stub(appRepo.prototype, 'findAppointmentByAppId').withArgs(appointmentId).resolves(appointment);
    const res = await chai.request(app).get(`/appointments/${appointmentId}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(appointment);
  });

  it('should find appointments by start time', async () => {
    const startTime = 'testTime';
    const appointments = [{ id: 1 }, { id: 2 }];
    sinon.stub(appRepo.prototype, 'findByStartTime').withArgs(startTime).resolves(appointments);
    const res = await chai.request(app).get(`/appointments/startTime/${startTime}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(appointments);
  });

  it('should delete appointment by ID', async () => {
    const appointmentId = 'testId';
    sinon.stub(appRepo.prototype, 'findByIdAndDelete').withArgs(appointmentId).resolves(true);
    const res = await chai.request(app).delete(`/appointments/${appointmentId}`);
    expect(res).to.have.status(200);
    expect(res.text).to.equal('Deleted');
  });

  it('should find appointments by status', async () => {
    const status = 'testStatus';
    const appointments = [{ id: 1 }, { id: 2 }];
    sinon.stub(appRepo.prototype, 'findByStatus').withArgs(status).resolves(appointments);
    const res = await chai.request(app).get(`/appointments/status/${status}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(appointments);
  });

  it('should submit a new appointment', async () => {
    const newAppointment = { id: 1 };
    sinon.stub(appointmentService.prototype, 'createNewAppointment').resolves(newAppointment); // Corrected service stub
    sinon.stub(appRepo.prototype, 'create').resolves(true);
    const res = await chai.request(app).post('/appointments').send(newAppointment);
    expect(res).to.have.status(200);
    expect(res.text).to.equal('New appointment created successfully');
  });

  it('should update an appointment', async () => {
    const newAppointment = { id: 1 };
    sinon.stub(appointmentService.prototype, 'updateNewAppointment').resolves(newAppointment); // Corrected service stub
    sinon.stub(appRepo.prototype, 'findByIdAndDeleteByAtributeAppointmentId').resolves(true);
    sinon.stub(appRepo.prototype, 'create').resolves(true);
    const res = await chai.request(app).put('/appointments').send({ newAppointment });
    expect(res).to.have.status(200);
    expect(res.body).to.equal(true);
  });

  it('should find all appointments by date', async () => {
    const date = '2024-03-28';
    const appointments = [{ id: 1 }, { id: 2 }];
    sinon.stub(appRepo.prototype, 'findAllAppointmentByDate').withArgs(date).resolves(appointments);
    const res = await chai.request(app).get(`/appointments/date/${date}`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(appointments);
  });
});
