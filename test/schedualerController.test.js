const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const Schedule = require('../models/schedule.model');
const ScheduleRepository = require('../repository/schedule.repository');
const app = require('../index'); // Update with the correct path to your app

chai.use(chaiHttp);

describe('Schedule API Tests', () => {
  describe('GET /schedule', () => {
    it('should get all schedules', (done) => {
      // Stub the ScheduleRepository.findAll method
      const findAllStub = sinon.stub(ScheduleRepository.prototype, 'findAll').resolves([
        { id: 1, title: 'Meeting 1' },
        { id: 2, title: 'Meeting 2' },
      ]);

      chai.request(ScheduleRepository)
        .get('/schedule')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.deep.equal([
            { id: 1, title: 'Meeting 1' },
            { id: 2, title: 'Meeting 2' },
          ]);

          // Restore the stub after the test
          findAllStub.restore();
          done();
        });
    });

    it('should handle errors when fetching schedules', (done) => {
      // Stub the ScheduleRepository.findAll method to simulate an error
      const findAllStub = sinon.stub(ScheduleRepository.prototype, 'findAll').rejects(new Error('Internal Server Error'));

      chai.request(app)
        .get('/schedule')
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.text).to.equal('Internal Server Error');

          // Restore the stub after the test
          findAllStub.restore();
          done();
        });
    });
  });

  // Add more test cases as needed
});
