var express = require('express')
var router = express.Router()
const middlewareToken = require('./verifyToken')
const middlewareRoles = require('./autherization')

router.get('/download',middlewareToken,middlewareRoles,(req,res)=>{
    
    res.send({'message':'success','details':`${req.user._id}`})
})

router.get('/license',middlewareToken,middlewareRoles,(req,res)=>{
    
    res.send({'message':'success','details':`${req.user._id}`})
})

module.exports = router;