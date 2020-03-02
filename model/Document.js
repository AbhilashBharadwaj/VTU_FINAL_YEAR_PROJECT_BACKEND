const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    
    company : {
        type : String,
        required : true,
        min : 6,
        max : 255
    },

    street : {
        type: String,
        required : true,
        max : 255,
        min : 6
    },

    city : {
        type: String,
        required : true,
        max : 255,
        min : 6
    },

    state : {
        type: String,
        required : true,
        max : 255,
        min : 6
    },

    zip : {
        type: String,
        required : true,
        max : 6,
        min : 6
    },

    author : {
        type : String,
        required : true,
        min:6
    },

    file_url : {
        type: String,
        required:true
    },

    owner : {
        type : String,
        required : true
    },

    file_name :{
        type : String,
        required : true
    },

    hash:{
        type:String,
        required:true
    }


},{timestamps:true});

module.exports = mongoose.model('Document',documentSchema)