var express = require('express')
var app = express()
var port = process.env.PORT||3000

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/new/:item*', function (req, res) {
  var url = req.params.item + req.params[0]
  res.send(url)
})

app.listen(port, function () {
  console.log(`Timestamp app listening ${process.env.IP} on port ${port}!`)
})
