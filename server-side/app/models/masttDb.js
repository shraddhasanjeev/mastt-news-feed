// Connecting Azure MongoDB

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//const mongoUrl = "mongodb://mastt-news-feed-db:yhtVbOS7558rETbRlA0rHGRy4WJ2MxiEsnsPZoWEs5y4AMJ7MO4MFzMuwARO9l1scMHdnwmRXFSVmS1YBX3S2Q==@mastt-news-feed-db.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@mastt-news-feed-db@"
const mongoUrl = "mongodb://mastt-news-feed:NTkZ9p3UL2t9AWtySOGXHm2pFPs18t1ORVhm1SO9oCwaqkvy9L94zVOVK4t8Bo4yTWO9gGs3bx6OspfWVn777A==@mastt-news-feed.documents.azure.com:10255/mastt-db?ssl=true&sslverifycertificate=false"

/* function connect() {
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },  function () {
    console.log('mongodb connected to Azure')
  });
} */

function connect() {
  mongoose.connect('mongodb://localhost/masttDB', { useNewUrlParser: true }, function () {
    console.log('mongodb connected')
  });
}

module.exports = {
  mongoose,
  connect
}