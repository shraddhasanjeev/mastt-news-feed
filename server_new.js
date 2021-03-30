const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(__dirname + "/app/views"));

require('./app/routes/routes.js')(app);

app.listen(port, function () {
	console.log('News Feed app listening on port 3000!')
});
	
module.exports = app;
