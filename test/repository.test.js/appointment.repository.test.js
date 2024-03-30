const chai = require('chai');
const sinon = require('sinon');
const AppointmentRepository = require('../../repository/appointment.repository');
const mongoose = require('mongoose');

const expect = chai.expect;

describe('AppointmentRepository', () => {
  let appointmentRepo;

  beforeEach(() => {
    // Mocking the model
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
      // Mock appointment data
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

      // Stub the Model.create method to return the new appointment
      const stubCreate = sinon.stub(appointmentRepo.Model, 'create').returns(newAppointmentData);

      // Call the function
      const newAppointment = await appointmentRepo.createNewAppointment(newAppointmentData);

      // Assertions
      expect(newAppointment).to.deep.equal(newAppointmentData);
      expect(stubCreate.calledOnceWith(newAppointmentData)).to.be.true;
    });

    it('should throw an error for invalid input', async () => {
      // Mock invalid appointment data
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

      // Stub the Model.create method to throw an error
      sinon.stub(appointmentRepo.Model, 'create').throws(new Error('Invalid input'));

      // Assertions
      await expect(appointmentRepo.createNewAppointment(invalidAppointmentData)).to.be.rejectedWith('Invalid input');
    });
  });

  // Add more describe blocks for other methods testing
});
