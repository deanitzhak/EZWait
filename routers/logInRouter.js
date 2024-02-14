const express = require('express');
const loginController= require("../controllers/logInControler");
const loginRouter = express.Router();
loginRouter.post('/logIn',loginController.checkUserExist);
module.exports = loginRouter;