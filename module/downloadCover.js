const mongoose = require('mongoose')
const license = require('../model/License')
const document = require('../model/Document')
module.exports = async (req,res,next)=>{
    //check if there is a dcoument_id in the req body
    if(!('document_id' in req.body))
        return res.send({'message':'error','details':'Please specify document_id'})

    // const result = await license.find({'document_id':req.body.document_id})
    const result = await license.findOne({'document_id':req.body.document_id,'redeemer_id':req.user})

    if(!result)
        return res.send({'message':'error','details':'No such document exists'})
        console.log("Redeemer id is "+req.user)


    const path = await document.findOne({'_id':req.body.document_id})

    if(!path)
        res.send({'message':'error','details':'Document not available'})

   // req.body.path = path.file_url // this doesnt work
    
    res.download(path.cover_url)
    next()



}