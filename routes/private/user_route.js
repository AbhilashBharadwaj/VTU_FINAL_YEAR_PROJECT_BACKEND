var express = require('express')
var router = express.Router()
const middlewareToken = require('./middleware/verifyToken')
const middlewareRoles = require('./middleware/autherization')
const licenseKeyFramework = require('../../module/licenseKey')
const upload = require('../../module/pdf_upload')
const licenseRedeem = require('./../../module/licenseRedeem')
const getAllDocuments = require('../../module/getAllDocuments')


router.get('/download',middlewareToken,middlewareRoles,(req,res)=>{
    

    
})

router.post('/newDocument',middlewareToken,middlewareRoles,upload.fields([{name:'document',maxCount:1},{name:'cover',maxCount:1}]),licenseKeyFramework.newDocument,(req,res)=>{
    
        
        
})

router.get('/generateLicenseKeys',middlewareToken,middlewareRoles,licenseKeyFramework.existingDocument,(req,res)=>{
    //the only parameter required is document_id and keys
    
})

router.get('/redeemLicenseKey',middlewareToken,middlewareRoles,licenseRedeem)
{

}

router.get('/getAllDocuments',middlewareToken,middlewareRoles,getAllDocuments,getAllDocuments,(req,res,next)=>{

})

module.exports = router;