const express = require('express');
const clientController = require("../controllers/clientController");
const clientRouter = express.Router();

clientRouter.get('/allClient', clientController.getAllclient);
clientRouter.get('/findAllByUserName', clientController.findAllByUserName);
clientRouter.get('/findClientByAppId', clientController.findClientByAppId);
clientRouter.get('/findAllClientByStatus', clientController.findAllClientByStatus);
clientRouter.get('/findClientByIdAndDelete', clientController.findClientByIdAndDelete);
clientRouter.post('/submitNewClient', clientController.submitNewClient);
clientRouter.put('/updateClientStatus', clientController.findClientByAppIdAndUpdateStatus);

module.exports = clientRouter; 