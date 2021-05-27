const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const azurePort = process.env.PORT;

/* Connect to Azure MongoDB */
require("./app/models/masttDb").connect()

/* Initialise Background running function */
require("./app/controllers/main/schedule.controller");

app.use(express.static(__dirname + "/app/views"));

/* Routers */
const router = require('./routes/routes');
app.use('/', router )

app.listen(azurePort, function () {
	console.log('News Feed app listening on port!' + azurePort)
});

module.exports = app;
