const express = require('express');
const userController = require("../controllers/userController");
const userRouter = express.Router();
userRouter.get('/getUserData', userController.getUserData);
module.exports = userRouter;
