// Connecting Azure MongoDB

/*
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://mastt-news-feed-db:yhtVbOS7558rETbRlA0rHGRy4WJ2MxiEsnsPZoWEs5y4AMJ7MO4MFzMuwARO9l1scMHdnwmRXFSVmS1YBX3S2Q%3D%3D@mastt-news-feed-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@mastt-news-feed-db@", function (err, client) {
  client.close();
});

module.exports = mongoClient;*/

const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
//const mongoUrl = "mongodb://mastt-news-feed-db:yhtVbOS7558rETbRlA0rHGRy4WJ2MxiEsnsPZoWEs5y4AMJ7MO4MFzMuwARO9l1scMHdnwmRXFSVmS1YBX3S2Q==@mastt-news-feed-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mastt-news-feed-db@"
const mongoUrl = "mongodb://mastt-news-feed-db:yhtVbOS7558rETbRlA0rHGRy4WJ2MxiEsnsPZoWEs5y4AMJ7MO4MFzMuwARO9l1scMHdnwmRXFSVmS1YBX3S2Q==@mastt-db.documents.azure.com:10255/mean-dev?ssl=true&sslverifycertificate=false"


function connect() {
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },  function () {
    console.log('mongodb connected')
  });
}
module.exports = {
  mongoose,
  connect
}