const express = require('express');
const loginController= require("../controllers/logInControler");
const loginRouter = express.Router();
loginRouter.post('/checkUserAdmin',loginController.checkUserAdmin);
loginRouter.post('/checkUserClient',loginController.checkUserClient);
module.exports = loginRouter;