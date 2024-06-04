var mongoose = require('mongoose');

var categoryschema = new mongoose.Schema({
    cat_name:{
        type:String
    }
});

module.exports = mongoose.model('category',categoryschema);