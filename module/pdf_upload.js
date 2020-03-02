const multer = require('multer')
const keygen = require("keygenerator");
const storage = multer.diskStorage({
    destination : function(req,file,callback){
        callback(null, './uploads/document_store/');
    },
    filename: function(req,file,callback){
        
        callback(null,keygen._({
            forceUppercase: true,
            length : 8
        })+"-"+Date.now()+".pdf");
    }
});

const upload = multer({ storage : storage});
module.exports = upload