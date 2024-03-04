const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;

const ScheduleRepository = require('../repository/schedule.repository');
const Schedule = require('../models/schedule.model');
const app = require('../index.js'); // Update with the correct path to your app
const schedRepo = new ScheduleRepository(Schedule);

chai.use(chaiHttp);

describe('Schedule Controller', () => {
  describe('POST /getStartAndEndTimeFromUser', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should create a new appointment', (done) => {
      const schedule = { _id: 'someId', takenHours: { appointments: [] } };
      sinon.stub(schedRepo, 'findByDayMonthYear').resolves(schedule);
      sinon.stub(schedRepo, 'updateScheduleValueTwoKeys').resolves(schedule);

      chai.request(app)
        .post('/getStartAndEndTimeFromUser') // Update with your actual route
        .send({
          newAppointment: JSON.stringify({
            Appointment: {
              date: '2022-03-01',
              startTime: '09:30',
              type: '1',
            },
          }),
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          // Add more assertions based on your response structure
          done();
        });
    });

    it('should handle appointment overlap', (done) => {
      const schedule = { _id: 'someId', takenHours: { appointments: [{ startAppointment: new Date(), duration: 1 }] } };
      sinon.stub(schedRepo, 'findByDayMonthYear').resolves(schedule);

      chai.request(app)
        .post('/getStartAndEndTimeFromUser') // Update with your actual route
        .send({
          newAppointment: JSON.stringify({
            Appointment: {
              date: '2022-03-01',
              startTime: '09:30',
              type: '1',
            },
          }),
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          // Add more assertions based on your response structure
          done();
        });
    });

    it('should handle invalid appointment time', (done) => {
      const schedule = { _id: 'someId', takenHours: { appointments: [] } };
      sinon.stub(schedRepo, 'findByDayMonthYear').resolves(schedule);

      chai.request(app)
        .post('/getStartAndEndTimeFromUser') // Update with your actual route
        .send({
          newAppointment: JSON.stringify({
            Appointment: {
              date: '2022-03-01',
              startTime: '08:30', // Invalid time
              type: '1',
            },
          }),
        })
        .end((err, res) => {
          expect(res).to.have.status(500);
          // Add more assertions based on your response structure
          done();
        });
    });

    // Add more test cases as needed
  });
});
