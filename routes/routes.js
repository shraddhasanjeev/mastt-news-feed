const express = require('express');
const router = express.Router();


/* Main */
const mainRouter = require('./mainRoutes');
router.get('/main', mainRouter)

/* Holiday */
const holidayRouter = require('./holidayRoutes');
router.get('/holiday', holidayRouter)

module.exports = router;