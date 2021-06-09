// Connecting Azure MongoDB

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoUrl = "mongodb://mastt-news-feed:NTkZ9p3UL2t9AWtySOGXHm2pFPs18t1ORVhm1SO9oCwaqkvy9L94zVOVK4t8Bo4yTWO9gGs3bx6OspfWVn777A==@mastt-news-feed.documents.azure.com:10255/mastt-db?ssl=true&sslverifycertificate=false"
// const mongoUrl = "mongodb://mastt-news-feed-2:7UxNITeAx3LnsGQgZFLKRURPp5VAP54jNVdGAI9FiqfLStUG5Hua5vpr0h5kw8znt4Q7jbFZ1hBMIrK7FfxH4A==@mastt-news-feed-2.mongo.cosmos.azure.com:10255/mastt-db?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@mastt-news-feed-2@"
function connect() {
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },  function () {
    console.log('mongodb connected to Azure')
  });
}
/* 
function connect() {
  mongoose.connect('mongodb://localhost/masttDB', { useNewUrlParser: true }, function () {
    console.log('mongodb connected')
  });
}
 */
module.exports = {
  mongoose,
  connect
}