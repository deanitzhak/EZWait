const chai = require('chai');
const sinon = require('sinon');
const ScheduleRepository = require('../../repository/schedule.repository');
const mongoose = require('mongoose');

const expect = chai.expect;

describe('ScheduleRepository', () => {
  let scheduleRepo;

  beforeEach(() => {
    // Mocking the model
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
      // Mock schedule data
      const scheduleId = 'mockedScheduleId';
      const key = 'day';
      const value = 5;
      const updatedSchedule = { _id: scheduleId, day: value, month: 3, year: 2024 };

      // Stub the Model.findById method to return the schedule
      sinon.stub(scheduleRepo.Model, 'findById').returns(updatedSchedule);

      // Call the function
      const result = await scheduleRepo.updateScheduleValue(scheduleId, key, value);

      // Assertions
      expect(result).to.deep.equal(updatedSchedule);
      expect(result[key]).to.equal(value);
    });

    it('should throw an error if schedule is not found', async () => {
      // Mock schedule data
      const scheduleId = 'nonExistentScheduleId';
      const key = 'day';
      const value = 5;

      // Stub the Model.findById method to return null (schedule not found)
      sinon.stub(scheduleRepo.Model, 'findById').returns(null);

      // Assertions
      await expect(scheduleRepo.updateScheduleValue(scheduleId, key, value)).to.be.rejectedWith('Schedule not found');
    });
  });

  describe('findByUserName', () => {
    it('should find schedules by username', async () => {
      // Mock schedule data
      const userName = 'testUser';
      const schedule = { _id: '1', userName: 'testUser', day: 5, month: 3, year: 2024 };

      // Stub the findByAttribute method to return the schedule
      sinon.stub(scheduleRepo, 'findByAttribute').returns(schedule);

      // Call the function
      const result = await scheduleRepo.findByUserName(userName);

      // Assertions
      expect(result).to.deep.equal(schedule);
    });
  });

  describe('findAll', () => {
    it('should find all schedules', async () => {
      // Mock schedule data
      const schedules = [{ _id: '1', userName: 'user1', day: 5, month: 3, year: 2024 }, { _id: '2', userName: 'user2', day: 6, month: 3, year: 2024 }];

      // Stub the find method to return the schedules
      sinon.stub(scheduleRepo, 'find').returns(schedules);

      // Call the function
      const result = await scheduleRepo.findAll();

      // Assertions
      expect(result).to.deep.equal(schedules);
    });
  });

  // Add more describe blocks for other methods testing
});
