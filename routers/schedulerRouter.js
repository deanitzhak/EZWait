const express = require('express');
const appointmentSchedluer = require("../service/scheduler");
const schedluerRouter = express.Router();

schedluerRouter.get('/scheduleNewAppointment', appointmentSchedluer.scheduleNewAppointment);
schedluerRouter.post('/reScheduleNewAppointment', appointmentSchedluer.reScheduleNewAppointment);

module.exports = schedluerRouter;
