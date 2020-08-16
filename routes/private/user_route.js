var express = require('express')
var router = express.Router()
const middlewareToken = require('./middleware/verifyToken')
const middlewareRoles = require('./middleware/autherization')
const licenseKeyFramework = require('../../module/licenseKey')
const upload = require('../../module/pdf_upload')
const licenseRedeem = require('./../../module/licenseRedeem')
const getAllDocuments = require('../../module/getAllDocuments')
const canDownload = require('../../module/canDownload')
const getOwnedDocuments = require('../../module/getOwnedDocuments')
const getAllKeys = require('../../module/getAllKeys')
const downloadImage = require('../../module/downloadCover')
router.post('/download',middlewareToken,middlewareRoles,canDownload,(req,res)=>{
    //res.download(req.path())
    return
})

router.post('/downloadImage',middlewareToken,middlewareRoles,downloadImage,(req,res)=>{
    //res.download(req.path())
    return
})



router.post('/newDocument',middlewareToken,middlewareRoles,upload.fields([{name:'document',maxCount:1},{name:'cover',maxCount:1}]),licenseKeyFramework.newDocument,(req,res)=>{
    
        
})

router.post('/generateLicenseKeys',middlewareToken,middlewareRoles,licenseKeyFramework.existingDocument,(req,res)=>{
    //the only parameter required is document_id and keys
    
})

router.post('/redeemLicenseKey',middlewareToken,middlewareRoles,licenseRedeem)
{
    //all we need in this route is the key
}

router.get('/getAllDocuments',middlewareToken,middlewareRoles,getAllDocuments,(req,res,next)=>{

})

router.get('/getOwnedDocuments',middlewareToken,middlewareRoles,getOwnedDocuments,(req,res,next)=>{

})

router.get('/getAllKeys',middlewareToken,middlewareRoles,getAllKeys,(req,res,next)=>{

})


//add two more routes
//1 to show all documents owned by an owner
//2 to get all keys owned by an owner
module.exports = router;