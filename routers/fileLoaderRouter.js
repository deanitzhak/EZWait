const express = require('express');
const fileLoaderController= require("../controllers/fileLoaderController");
const fileLoaderRouter = express.Router();

fileLoaderRouter.get('/',fileLoaderController.signInPage);

fileLoaderRouter.get('/singIn.html',fileLoaderController.signInPage);
fileLoaderRouter.get('/profilePgae.html',fileLoaderController.profilePage);

module.exports = fileLoaderRouter;