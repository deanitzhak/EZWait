const chai = require('chai');
const sinon = require('sinon');
const appointmentService = require('../../service/appoinmentService');
const appointmentModel = require('../../models/appointment.model');

const expect = chai.expect;

describe('Appointment Service', () => {
  describe('createNewAppointment', () => {
    afterEach(() => {
      sinon.restore(); // Restore sinon stubs after each test
    });

    it('should create a new appointment with valid input', async () => {
      // Mock data for new appointment
      const newAppointmentJSON = {
        Appointment: {
          appointmentId: '1',
          userName: 'testUser',
          firstName: 'John',
          lastName: 'Doe',
          type: '1', // Assuming type 1 for testing
          startTime: '10:00',
          date: '2024-03-25',
          duration: 60
        }
      };

      // Stub combineDateAndHoursToDate function
      sinon.stub(appointmentService, 'combinDateAndHoursToDate').returns(new Date('2024-03-25T10:00:00'));

      // Call the function
      const newAppointment = await appointmentService.createNewAppointment(newAppointmentJSON);

      // Assertions
      expect(newAppointment).to.be.an.instanceOf(appointmentModel);
      expect(newAppointment.appointmentId).to.equal('1');
      expect(newAppointment.userName).to.equal('testUser');
      // Add more assertions based on expected appointment properties
    });

    it('should handle invalid input fields gracefully', async () => {
      // Mock appointment data with missing required fields
      const invalidAppointmentJSON = {
        Appointment: {
          // Missing required fields
        }
      };

      // Call the function with invalid input
      const newAppointment = await appointmentService.createNewAppointment(invalidAppointmentJSON);

      // Assertions
      expect(newAppointment).to.be.an('error');
      // Add more assertions based on expected error handling
    });

    // Add more test cases for other scenarios
  });
    describe('updateNewAppointment', () => {
    afterEach(() => {
      sinon.restore(); // Restore sinon stubs after each test
    });

    it('should update an existing appointment with valid input', async () => {
      // Mock appointment data
      const updatedAppointmentJSON = {
        Appointment: {
          appointmentId: '1',
          userName: 'testUser',
          firstName: 'John',
          lastName: 'Doe',
          type: '1', // Assuming type 1 for testing
          startTime: '10:00',
          date: '2024-03-25',
          duration: 60
        }
      };

      // Stub combainDateAndHoursToDate function
      sinon.stub(appointmentService, 'combainDateAndHoursToDate').returns(new Date('2024-03-25T10:00:00'));

      // Call the function
      const updatedAppointment = await appointmentService.updateNewAppointment(updatedAppointmentJSON);

      // Assertions
      expect(updatedAppointment).to.be.an.instanceOf(appointmentModel);
      expect(updatedAppointment.appointmentId).to.equal('1');
      expect(updatedAppointment.userName).to.equal('testUser');
      // Add more assertions based on expected appointment properties
    });

    it('should handle appointment type mapping correctly', async () => {
      // Mock appointment data with different appointment types
      const appointmentWithType2JSON = {
        Appointment: {
            appointmentId: '1',
            userName: 'testUser',
            firstName: 'John',
            lastName: 'Doe',
            type: '1', // Assuming type 1 for testing
            startTime: '10:00',
            date: '2024-03-25',
            duration: 60
          }
      };

      // Call the function with appointment type 2
      const updatedAppointment = await appointmentService.updateNewAppointment(appointmentWithType2JSON);

      // Assertions
      expect(updatedAppointment.type).to.equal('value2');
      // Add more assertions based on expected behavior for other appointment types
    });

    // Add more test cases for other scenarios
  });

  // Add more describe blocks for additional test scenarios such as Date and Time Handling, Mocking Dependencies, Database Interaction, Concurrency and Performance, Security, etc.
});
