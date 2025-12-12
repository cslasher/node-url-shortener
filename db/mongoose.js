var mongoose = require('mongoose');

var ip = process.env.IP || '127.0.0.1';
var mongoURL = `mongodb://${ip}:27017/urlshortener`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = { mongoose };
