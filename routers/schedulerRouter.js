const express = require('express');
const appointmentSchedluer = require("../service/scheduler");
const schedluerRouter = express.Router();

schedluerRouter.get('/getStartAndEndTimeFromUser', appointmentSchedluer.getStartAndEndTimeFromUser);

module.exports = schedluerRouter;
