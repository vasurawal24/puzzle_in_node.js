const mongoose = require('mongoose');
var newSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    categary_id: {
        type: mongoose.Schema.Types.String,
        ref: 'cat',
    },
    img: {
        type: String,
    },
    ans: { 
        type: String,
    },
    char: {
        type: String,
    }
})
module.exports = mongoose.model('newpuzzle', newSchema);    