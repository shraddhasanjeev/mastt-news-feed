// Connecting Azure MongoDB

const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://mastt-news-feed-db:yhtVbOS7558rETbRlA0rHGRy4WJ2MxiEsnsPZoWEs5y4AMJ7MO4MFzMuwARO9l1scMHdnwmRXFSVmS1YBX3S2Q%3D%3D@mastt-news-feed-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mastt-news-feed-db@", function (err, client) {
  client.close();
});

module.exports = mongoClient;