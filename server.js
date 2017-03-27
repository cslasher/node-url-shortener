var ip = process.env.IP||'127.0.0.1'
var port = process.env.PORT||3000

var express = require('express')
var app = express()
var validator = require('validator')
var mongoClient = require('mongodb').MongoClient
var mongoURL = `mongodb://${ip}:27017/urlshortener`


app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/new/:item*', function (req, res) {
  var url = req.params.item + req.params[0]
  if (validator.isURL(url)) {
    mongoClient.connect(mongoURL, function (err, db){
      if (err) {
        console.log('MongoDB error:', err)
      } else {
        console.log ('MongoDB working! ', mongoURL)
      }
    })
  	res.send(url)
  } else {
  	res.send(`This is not a valid URL: ${url}`)
  }
})

app.listen(port, function () {
  console.log(`Timestamp app listening ${ip} on port ${port}!`)
})
