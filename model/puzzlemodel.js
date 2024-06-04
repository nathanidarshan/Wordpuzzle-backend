var mongoose = require('mongoose');

var puzzleschema = new mongoose.Schema({
    puzzle_name:{
        type:String
    },
    p_image:{
        type:String
    },
    puzzle_string:{
        type:String
    },
    cat_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    win_id:{
        type:Array,
        default:0
    }
});

module.exports = mongoose.model('puzzle',puzzleschema);