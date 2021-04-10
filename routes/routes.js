const express = require('express');
const router = express.Router();
const controller = require('../controllers/main/mainController');

/* Main */
router.get('/', controller.welcomePage);

/* Holiday */
const holidayRouter = require('./holidayRoutes');
router.get('/holiday', holidayRouter)

module.exports = router;