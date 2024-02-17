
const express = require('express');
const appointmentController = require("../controllers/appointmentController");
const appointmentRouter = express.Router();

appointmentRouter.post('/allAppointment', appointmentController.getAllAppointment);
appointmentRouter.post('/findAllByUserName', appointmentController.findAllByUserName);

module.exports = appointmentRouter;
