var ip = process.env.IP || '127.0.0.1';
var port = process.env.PORT || 3000;

var express = require('express');
var validator = require('validator');
var shorthash = require('shorthash');

var { mongoose } = require('./db/mongoose');

var { URL } = require('./models/url');
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/new/:item*', (req, res) => {
  var address = req.params.item + req.params[0];
  if (validator.isURL(address)) {
    var shortAddress = shorthash.unique(address);
    var urlDoc = {
      address,
      shortAddress,
    };

    URL.findOne({ shortAddress: shortAddress })
      .then((url) => {
        if (!url) {
          var newUrl = new URL(urlDoc);
          newUrl.save().catch((err) => {
            console.error('Error saving URL:', err);
          });
        }
      })
      .catch((err) => {
        console.error('Error finding URL:', err);
      });

    res.send(urlDoc);
  } else {
    res.send(`This is not a valid URL: ${address}`);
  }
});

//redirect if address found, if no address found, display Error
app.get('/:shortAddress', (req, res) => {
  var shortAddress = req.params.shortAddress;

  URL.findOne({ shortAddress: shortAddress })
    .then((url) => {
      if (!url) {
        return res.send({
          error: 'This code does not point to any url in the database',
        });
      }

      if (validator.isURL(url.address, { require_protocol: true })) {
        res.redirect(url.address);
      } else {
        res.redirect('http://' + url.address);
      }
    })
    .catch((err) => {
      console.error('Error finding URL for redirect:', err);
      res.status(500).send({ error: 'Internal server error' });
    });
});

app.listen(port, () => {
  console.log(`Server listening: ${ip} on port ${port}!`);
});
