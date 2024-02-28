const express = require('express');
const clientController = require("../controllers/clientController");
const clientRouter = express.Router();

appointmentRouter.get('/allClient', clientController.getAllclient);
appointmentRouter.get('/findAllByUserName', clientController.findAllByUserName);
appointmentRouter.get('/findClientByAppId', clientController.findClientByAppId);
appointmentRouter.get('/findAllClientByStatus', clientController.findAllClientByStatus);
appointmentRouter.get('/findClientByIdAndDelete', clientController.findClientByIdAndDelete);
appointmentRouter.post('/submitNewClient', clientController.submitNewClient);
appointmentRouter.put('/updateClientStatus', clientController.findClientByAppIdAndUpdateStatus);

module.exports = clientRouter; 