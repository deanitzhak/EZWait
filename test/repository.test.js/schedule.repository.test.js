const chai = require('chai');
const sinon = require('sinon');
const ScheduleRepository = require('../../repository/schedule.repository');
const mongoose = require('mongoose');

const expect = chai.expect;

describe('ScheduleRepository', () => {
  let scheduleRepo;

  beforeEach(() => {
    const MockModel = {
      findById: sinon.stub(),
      findByAttribute: sinon.stub(),
      find: sinon.stub(),
      findOne: sinon.stub(),
      create: sinon.stub(),
      save: sinon.stub()
    };

    scheduleRepo = new ScheduleRepository(MockModel);
  });

  describe('updateScheduleValue', () => {
    it('should update a schedule value with valid input', async () => {
      const scheduleId = 'mockedScheduleId';
      const key = 'day';
      const value = 5;
      const updatedSchedule = { _id: scheduleId, day: value, month: 3, year: 2024 };

      sinon.stub(scheduleRepo.Model, 'findById').returns(updatedSchedule);

      const result = await scheduleRepo.updateScheduleValue(scheduleId, key, value);

      expect(result).to.deep.equal(updatedSchedule);
      expect(result[key]).to.equal(value);
    });

    it('should throw an error if schedule is not found', async () => {
      const scheduleId = 'nonExistentScheduleId';
      const key = 'day';
      const value = 5;

      sinon.stub(scheduleRepo.Model, 'findById').returns(null);

      await expect(scheduleRepo.updateScheduleValue(scheduleId, key, value)).to.be.rejectedWith('Schedule not found');
    });
  });

  describe('findByUserName', () => {
    it('should find schedules by username', async () => {
      const userName = 'testUser';
      const schedule = { _id: '1', userName: 'testUser', day: 5, month: 3, year: 2024 };

      sinon.stub(scheduleRepo, 'findByAttribute').returns(schedule);

      const result = await scheduleRepo.findByUserName(userName);

      expect(result).to.deep.equal(schedule);
    });
  });

  describe('findAll', () => {
    it('should find all schedules', async () => {
      const schedules = [{ _id: '1', userName: 'user1', day: 5, month: 3, year: 2024 }, { _id: '2', userName: 'user2', day: 6, month: 3, year: 2024 }];

      sinon.stub(scheduleRepo, 'find').returns(schedules);

      const result = await scheduleRepo.findAll();

      expect(result).to.deep.equal(schedules);
    });
  });

});
