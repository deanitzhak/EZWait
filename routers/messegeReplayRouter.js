const express = require('express');
const messegeReplayController = require("../controllers/messegeReplayController");
const messegeReplayRouter = express.Router();

messegeReplayRouter.post('/AllMessegeReplay',messegeReplayController.getAllMessegeReplay);
messegeReplayRouter.post('/findAllByUserName',messegeReplayController.findAllByUserName);

module.exports = messegeReplayRouter;
