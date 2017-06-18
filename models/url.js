
var mongoose = require("mongoose")

var URL = mongoose.model('URL', {
    address: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    shortAddress: {
        type: String,
        required: true
    }
})

module.exports = {URL}