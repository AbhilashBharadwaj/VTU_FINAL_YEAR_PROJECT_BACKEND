const mongoose = require('mongoose')

const licenseSchema = new mongoose.Schema({
    key : {
        type : String,
        required : true,
        min : 40,
        max : 40
    },

    document_id : {
        type : String,
        required : true
    },

    expiry_date : {
        type : Date,
        
    }


});

module.exports = mongoose.model('License',licenseSchema)