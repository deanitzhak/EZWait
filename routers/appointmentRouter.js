
const express = require('express');
const appointmentController = require("../controllers/appointmentController");
const appointmentRouter = express.Router();

appointmentRouter.get('/allAppointment', appointmentController.getAllAppointment);
appointmentRouter.get('/findAllByUserName', appointmentController.findAllByUserName);
appointmentRouter.get('/findAppointmentByAppId', appointmentController.findAppointmentByAppId);
appointmentRouter.get('/findAllAppointmentByStatus', appointmentController.findAllAppointmentByStatus);
appointmentRouter.get('/findAppointmentByStartTime', appointmentController.findAppointmentByStartTime);
appointmentRouter.get('/findAppointmentByIdAndDelete', appointmentController.findAppointmentByIdAndDelete);
appointmentRouter.post('/submitNewAppointment', appointmentController.submitNewAppointment);


module.exports = appointmentRouter;
