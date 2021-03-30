const express = require('express');
const router = express.Router();
const controller = require('../controllers/server.controller');

module.exports = function() {

    // Routes
    router.get('/', controller.welcomePage);

};