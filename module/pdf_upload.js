const multer = require('multer')
const keygen = require("keygenerator");
const config = require('../model/app_config')
const storage = multer.diskStorage({
    destination : function(req,file,callback){
        var path = config.ALLOWED_DOCUMENTS.includes(file.mimetype.split("/")[1])?'./uploads/document_store/':'./uploads/document_store/cover'
        callback(null,path);
    },
    filename: function(req,file,callback){
        
        callback(null,keygen._({
            forceUppercase: true,
            length : 8
        })+"-"+Date.now()+"."+file.mimetype.split("/")[1]);
    }
});

const upload = multer({ storage : storage,fileFilter:(req,file,cb)=>{
    
    if(file.fieldname=='document')
    {
        
        if((config.ALLOWED_DOCUMENTS.includes(file.mimetype.split("/")[1]))==false)
            return cb(new Error('Only valid documents allowed in this field'))
        else
            cb(null,true)
    }

    else if(file.fieldname=='cover'){
        if(config.ALLOWED_IMAGES.includes((file.mimetype.split("/")[1]))==false)
            return cb(new Error('Only image file is allowed in this field'))
        else
            cb(null,true)
    }
    else
        return cb(new Error('Invalid file upload.Please upload with valid file extensions'))
}})
module.exports = upload