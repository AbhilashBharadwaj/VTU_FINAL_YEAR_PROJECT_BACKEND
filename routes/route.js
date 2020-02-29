var express = require('express')
var router = express.Router()
var fact = require('../module/factorial')
var hash = require('../module/generateHash')

//now we define our routes and export router so that the main index.js can refer to this for routing


router.get('/hash',(req,res)=>{

    res.json({'hash':hash.generateHash()})
})

router.get('/',(req,res)=>{
    res.json({'message':'Hello'})
})

module.exports = router