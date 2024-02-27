const express = require('express');
const profileController = require("../controllers/profileController");
const profileRouter = express.Router();

appointmentRouter.get('/allProfile', profileController.getAllProfile);
appointmentRouter.get('/findAllByUserName', profileController.findAllByUserName);
appointmentRouter.get('/findProfileByAppId', profileController.findProfileByAppId);
appointmentRouter.get('/findAllProfileByStatus', profileController.findAllProfileByStatus);
appointmentRouter.get('/findProfileByIdAndDelete', profileController.findProfileByIdAndDelete);
appointmentRouter.post('/submitNewProfile', profileController.submitNewProfile);
appointmentRouter.put('/updateProfileStatus', profileController.findProfileByAppIdAndUpdateStatus);

module.exports = profileRouter; 