const express = require('express');
const messegeSentController = require("../controllers/messegeSentController");
const messegeSentRouter = express.Router();

messegeSentRouter.post('/AllMessegeSent',messegeSentController.getAllMessegeSent);
messegeSentRouter.post('/findAllByUserName',messegeSentController.findAllByUserName);

module.exports = messegeSentRouter;
