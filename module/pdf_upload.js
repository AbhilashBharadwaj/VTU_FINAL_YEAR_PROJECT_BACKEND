const multer = require('multer')
const keygen = require("keygenerator");
const storage = multer.diskStorage({
    destination : function(req,file,callback){
        var path = file.mimetype.split("/")[1]=="pdf"?'./uploads/document_store/':'./uploads/document_store/cover'
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
        
        if((['pdf'].includes(file.mimetype.split("/")[1]))==false)
            return cb(new Error('Only pdf file is allowed in this field'))
        else
            cb(null,true)
    }

    else if(file.fieldname=='cover'){
        if(['jpeg','jpg','png','gif','bmp'].includes((file.mimetype.split("/")[1]))==false)
            return cb(new Error('Only image file is allowed in this field'))
        else
            cb(null,true)
    }
    else
        return cb(new Error('Invalid file upload.Please upload with valid file extensions'))
}})
module.exports = upload