const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const controller = require('../../controllers/scheduleController.js');
const ScheduleRepository = require('../../repository/schedule.repository');
const ScheduleModel = require('../../models/schedule.model');

chai.use(chaiHttp);

describe('Schedule Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get all schedules', async () => {
    const schedules = [{ id: 1 }, { id: 2 }];
    sinon.stub(ScheduleRepository.prototype, 'findAll').resolves(schedules);
    const res = await chai.request(controller).get('/schedules');
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(schedules);
  });
});
