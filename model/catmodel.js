const mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    img: {
        type: String,
    }
})
module.exports = mongoose.model('image',imageSchema);