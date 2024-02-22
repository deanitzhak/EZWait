const express = require('express');
const fileLoaderController= require("../controllers/fileLoaderController");
const fileLoaderRouter = express.Router();

fileLoaderRouter.get('/',fileLoaderController.signInPage);

fileLoaderRouter.get('/singIn.html',fileLoaderController.signInPage);
fileLoaderRouter.get('/appointmentPage.html',fileLoaderController.appointmentPage);

module.exports = fileLoaderRouter;