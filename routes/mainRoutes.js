const express = require('express');
const mainRouter = express.Router();
const controller = require('../controllers/main/mainController');

mainRouter.get('/main', controller.getData)

module.exports = mainRouter;