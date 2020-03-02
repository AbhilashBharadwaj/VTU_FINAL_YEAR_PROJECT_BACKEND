var express = require('express')
var router = express.Router()
const middlewareToken = require('./verifyToken')
const middlewareRoles = require('./autherization')
const licenseKeyFramework = require('../../module/licenseKey')
const upload = require('../../module/pdf_upload')



router.get('/download',middlewareToken,middlewareRoles,(req,res)=>{
    
    res.send({'message':'success','details':`${req.user._id}`})
})

router.post('/newDocument',middlewareToken,middlewareRoles,upload.single('file'),licenseKeyFramework.newDocument,(req,res)=>{
    
        
        
})

router.get('/generateLicenseKeys',middlewareToken,middlewareRoles,licenseKeyFramework.existingDocument,(req,res)=>{
    //the only parameter required is document_id and keys
    
})

module.exports = router;