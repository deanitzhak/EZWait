const Schedule = require('../models/schedule.model');
const ScheduleRepository = require('../repository/schedule.repository');
const {PropertyNotFound} = require("../errors/NotFound.errors");

module.exports = {
    getAllSchedule:(req,res) => {
        const ScheRepo = new ScheduleRepository(Schedule);
        ScheRepo.findAll()
        .then(schedule => {
            if(!schedule) throw new PropertyNotFound("getAllSchedule");
            res.status(200).send(schedule);
        })
        .catch(err => {
            res.status(404).send(err);
        })
    },
}