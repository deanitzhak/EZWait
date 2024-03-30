const chai = require('chai');
const sinon = require('sinon');
const AppointmentRepository = require('../../repository/appointment.repository');
const mongoose = require('mongoose');

const expect = chai.expect;

describe('AppointmentRepository', () => {
  let appointmentRepo;

  beforeEach(() => {
    const MockModel = {
      findOne: sinon.stub(),
      findById: sinon.stub(),
      findByIdAndDelete: sinon.stub(),
      create: sinon.stub(),
      save: sinon.stub()
    };

    appointmentRepo = new AppointmentRepository(MockModel);
  });

  describe('createNewAppointment', () => {
    it('should create a new appointment with valid input', async () => {
      const newAppointmentData = {
        appointmentId: '1',
        userName: 'testUser',
        firstName: 'John',
        lastName: 'Doe',
        type: 'value1',
        startTime: '10:00',
        date: '2024-03-25',
        duration: 60
      };

      const stubCreate = sinon.stub(appointmentRepo.Model, 'create').returns(newAppointmentData);

      const newAppointment = await appointmentRepo.createNewAppointment(newAppointmentData);

      expect(newAppointment).to.deep.equal(newAppointmentData);
      expect(stubCreate.calledOnceWith(newAppointmentData)).to.be.true;
    });

    it('should throw an error for invalid input', async () => {
      const invalidAppointmentData = {
        appointmentId: '1',
        userName: 'testUser',
        firstName: 20,
        lastName: 'Doe',
        type: 'value1',
        startTime: '10:00',
        date: '2024-03-25',
        duration: 60
      };

      sinon.stub(appointmentRepo.Model, 'create').throws(new Error('Invalid input'));

      await expect(appointmentRepo.createNewAppointment(invalidAppointmentData)).to.be.rejectedWith('Invalid input');
    });
  });

});
