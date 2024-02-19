const Schedule = require('../models/schedule.model');
const ScheduleRepository = require('../repository/schedule.repository');

module.exports = {
    getAllSchedule:(req,res) => {
        const ScheRepo = new ScheduleRepository(Schedule);
        ScheRepo.findAll()
        .then(schedule => {
            res.send(schedule);
        })
        .catch(err => {
            res.send(err);
        })
    },
}