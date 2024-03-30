const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const moment = require('moment');

const expect = chai.expect;
chai.use(chaiHttp);

// Import the appointmentSchedluer service
const appointmentSchedluer = require('../../service/scheduler');

describe('appointmentSchedluer Service', () => {
  describe('scheduleNewAppointment', () => {
    it('should schedule a new appointment', async () => {
      // Mock request and response objects
      const req = {
        query: {
          newAppointment: JSON.stringify({
            Appointment: {
              date: '2024-04-01',
              startTime: '09:00',
              type: '1' // Assuming type 1 corresponds to a 2-hour appointment
            }
          })
        }
      };
      const res = {
        send: sinon.spy(),
        status: sinon.stub().returnsThis()
      };


      await appointmentSchedluer.scheduleNewAppointment(req, res);

      // Assertions
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    });

  });

  describe('reScheduleNewAppointment', () => {
    it('should reschedule an existing appointment', async () => {
      // Mock request and response objects
      const req = {
        body: {
          newRescheduleAppointment: {
            date: '2024-04-02',
            startTime: '10:00',
            type: '2', // Assuming type 2 corresponds to a 3-hour appointment
            appointmentId: '123456789012' // Assuming a valid appointment ID
          },
          oldDate: '2024-04-01' // Assuming the original appointment date
        }
      };
      const res = {
        send: sinon.spy(),
        status: sinon.stub().returnsThis()
      };

      // Stub external dependencies or repository calls if needed

      // Call the function
      await appointmentSchedluer.reScheduleNewAppointment(req, res);

      // Assertions
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    });

  });

  describe('cancelAppointmentById', () => {
    it('should cancel an existing appointment', async () => {
      // Mock request and response objects
      const req = {
        body: {
          appointmentId: '123456789012', // Assuming a valid appointment ID
          date: '2024-04-01' // Assuming the appointment date
        }
      };
  
      const res = {
        status: sinon.stub().returnsThis(), // Stub the status function
        send: sinon.spy() // Spy on the send function
      };
  
      await appointmentSchedluer.cancelAppointmentById(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledOnce).to.be.true;
    });
  
  });
});
