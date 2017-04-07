var ip = process.env.IP||'127.0.0.1'
var port = process.env.PORT||3000

var express = require('express')
var app = express()
var validator = require('validator')
var crypto = require('crypto')

// var mongoClient = require('mongodb').MongoClient
// var mongoURL = `mongodb://${ip}:27017/urlshortener`


app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/new/:item*', function (req, res) {
  var url = req.params.item + req.params[0]
  var hash = ""
  if (validator.isURL(url)) {
    // mongoClient.connect(mongoURL, function (err, db){
    //   if (err) {
    //     console.log('MongoDB error:', err)
    //   } else {
    //     console.log ('MongoDB working! ', mongoURL)
    //   }
    // })

    const secret = 'test'
    const hash = crypto.createHmac('sha256', secret)
                       .update(url)
                       .digest('hex')
    
  	res.send(`<table><tr><td>URL</td><td>HASH</td></tr><tr><td>${url}</td><td>${hash}</td></tr></table>`)
  } else {
  	res.send(`This is not a valid URL: ${url}`)
  }
})

app.listen(port, function () {
  console.log(`Timestamp app listening ${ip} on port ${port}!`)
})
