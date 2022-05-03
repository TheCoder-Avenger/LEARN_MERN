const mongoose = require('mongoose');

const Schema = mongoose.Schema

const refresSchema = new Schema({
    token : {
        type : String,
        required : true
    }
}, {timestamps : true});


module.exports = mongoose.model('Refresh', refresSchema);