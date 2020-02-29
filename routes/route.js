var express = require('express')
var router = express.Router()
var fact = require('../module/factorial')
var hash = require('../module/generateHash')

//now we define our routes and export router so that the main index.js can refer to this for routing


router.get('/guest',(req,res)=>{

    res.json({'value':fact.fact(5),'hash':hash.generateHash})
})

module.exports = router