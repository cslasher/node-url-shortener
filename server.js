var express = require('express')
var app = express()
var json = new Object()
var port = process.env.PORT||3000

app.get('/', function (req, res) {
    var ip = req.ip
    var language = req.acceptsLanguages()
    var software = req.headers['user-agent']

    json.ipaddress = ip
    json.language = language
    json.software = software

  res.end(JSON.stringify(json))
})

app.get('/new/:item*', function (req, res) {
  var url = req.params.item + req.params[0]
  res.send(url)
})

app.listen(port, function () {
  console.log(`Timestamp app listening on port ${port}!`)
})
