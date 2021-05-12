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

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});


app.listen(azurePort, function () {
	console.log('News Feed app listening on port 3000!')
});

module.exports = app;
