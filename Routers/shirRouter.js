const express = require('express');
const templatesController = require('../controllers/templatesControllers');
const templatesRouter = new express.Router();
templatesRouter.get('/', templatesController.getAllTemplates);
templatesRouter.get('/num', templatesController.getNumOfTemplates);
templatesRouter.get('/:id', templatesController.getTemplate);
templatesRouter.post('/', templatesController.createTemplateHandler);
templatesRouter.put('/:id', templatesController.editTemplateHandler);
templatesRouter.delete('/', templatesController.deleteTemplateHandler);
module.exports = {
    templatesRouter
}