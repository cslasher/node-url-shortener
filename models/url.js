var mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  shortAddress: {
    type: String,
    required: true,
  },
});

var URL = mongoose.model('URL', urlSchema);

module.exports = { URL };
