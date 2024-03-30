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

      sinon.stub(appointmentService, 'combainDateAndHoursToDate').returns(new Date('2024-03-25T10:00:00'));

      const newAppointment = await appointmentService.createNewAppointment(newAppointmentJSON);

      expect(newAppointment).to.be.an.instanceOf(appointmentModel);
      expect(newAppointment.appointmentId).to.equal('1');
      expect(newAppointment.userName).to.equal('testUser');
    });

    it('should handle invalid input fields gracefully', async () => {
      const invalidAppointmentJSON = {
        Appointment: {
        }
      };

      const newAppointment = await appointmentService.createNewAppointment(invalidAppointmentJSON);

      expect(newAppointment).to.be.an('error');
    });

  });
    describe('updateNewAppointment', () => {
    afterEach(() => {
      sinon.restore(); // Restore sinon stubs after each test
    });

    it('should update an existing appointment with valid input', async () => {
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

      sinon.stub(appointmentService, 'combainDateAndHoursToDate').returns(new Date('2024-03-25T10:00:00'));

      const updatedAppointment = await appointmentService.updateNewAppointment(updatedAppointmentJSON);

      expect(updatedAppointment).to.be.an.instanceOf(appointmentModel);
      expect(updatedAppointment.appointmentId).to.equal('1');
      expect(updatedAppointment.userName).to.equal('testUser');
    });

    it('should handle appointment type mapping correctly', async () => {
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

      const updatedAppointment = await appointmentService.updateNewAppointment(appointmentWithType2JSON);

      expect(updatedAppointment.type).to.equal('value2');
    });
  });

});
