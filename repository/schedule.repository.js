const MongoStorage = require('../db/mongo.storage');

class ScheduleRepository extends MongoStorage {
    constructor(mod) {
        super(mod); 
        this.Model = mod;
        this.updateScheduleValue = this.updateScheduleValue.bind(this);
        this.findByUserName = this.findByUserName.bind(this);
        this.findAll = this.findAll.bind(this);
    }

    async updateScheduleValue(scheduleId, key, value) {
        try {
            const schedule = await this.Model.findById(scheduleId);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            schedule[key] = value;
            const updatedSchedule = await schedule.save();
            return updatedSchedule;
        } catch (error) {
            throw new Error(`Error updating schedule value: ${error.message}`);
        }
    }

    async findByUserName(userName) {
        try {
            const schedule = await this.findByAttribute('userName', userName);
            return schedule;
        } catch (error) {
            throw new Error(`Error retrieving schedules by userId: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const schedules = await this.find();
            console.log("assdsdsadsads->",schedules);
            return schedules;
        } catch (error) {
            throw new Error(`Error retrieving schedules: ${err.message}`);
        }
    }
}

module.exports = ScheduleRepository;
