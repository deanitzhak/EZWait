const express = require('express');
const profileController = require("../controllers/profileController");
const profileRouter = express.Router();

profileRouter.get('/allProfile', profileController.getAllprofile);
profileRouter.get('/findAllByUserName', profileController.findAllByUserName);
profileRouter.get('/findClientByAppId', profileController.findProfileByAppId);
// clientRouter.get('/findAllProfileByStatus', profileController.findAllProfileByStatus);
profileRouter.get('/findProfileByIdAndDelete', profileController.findProfileByIdAndDelete);
profileRouter.post('/submitNewProfile', profileController.submitNewProfile);
// clientRouter.put('/updateProfileStatus', profileController.findProfileByAppIdAndUpdateStatus);

module.exports = profileRouter; 