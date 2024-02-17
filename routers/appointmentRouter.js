
const express = require('express');
const appointmentController = require("../controllers/appointmentController");
const appointmentRouter = express.Router();

appointmentRouter.post('/allAppointment', appointmentController.getAllAppointment);
appointmentRouter.post('/findAllByUserName', appointmentController.findAllByUserName);
appointmentRouter.post('/findAppointmentByAppId', appointmentController.findAppointmentByAppId);
appointmentRouter.post('/findAllAppointmentByStatus', appointmentController.findAllAppointmentByStatus);
appointmentRouter.post('/findAppointmentByStartTime', appointmentController.findAppointmentByStartTime);
appointmentRouter.post('/findAppointmentByIdAndDelete', appointmentController.findAppointmentByIdAndDelete);

module.exports = appointmentRouter;
