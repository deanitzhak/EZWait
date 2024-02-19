const express = require('express');
const scheduleController = require("../controllers/scheduleController");
const scheduleRouter = express.Router();

scheduleRouter.post('/AllSchedule',scheduleController.getAllSchedule);

module.exports = scheduleRouter;
