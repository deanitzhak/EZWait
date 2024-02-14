const express = require('express');
const userController = require("../controllers/userController");
const userRouter = express.Router();
userRouter.post('/getUserData', userController.getUserData);
module.exports = userRouter;
