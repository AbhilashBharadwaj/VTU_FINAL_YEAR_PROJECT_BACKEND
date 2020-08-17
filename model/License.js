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

    expireAt: { type: Date, default: undefined },

    validity : {type:Number,default:undefined},

    redeemer_id : {type:String},

    redeemer_name : {type:String}


},{timestamps:true});
licenseSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 })
module.exports = mongoose.model('License',licenseSchema)