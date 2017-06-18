var mongoose = require("mongoose")

var ip = process.env.IP||'127.0.0.1'
var mongoURL = `mongodb://${ip}:27017/urlshortener`

mongoose.Promise = global.Promise
mongoose.connect(mongoURL)

module.exports = {mongoose}