var express = require('express')
var app = express()
var validator = require('validator')
var port = process.env.PORT||3000

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/new/:item*', function (req, res) {
  var url = req.params.item + req.params[0]
  if (validator.isURL(url)) {
  	res.send(url)
  } else {
  	res.send(`This is not a valid URL: ${url}`)
  }
})

app.listen(port, function () {
  console.log(`Timestamp app listening ${process.env.IP} on port ${port}!`)
})
