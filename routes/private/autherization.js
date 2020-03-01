const mongoose = require('mongoose')

module.exports =  (req,res,next)=>{

    mongoose.connection.db.collection('authorization', function (err, collection) {
    collection.find({role:'normal'}).toArray((err,docs)=>{
        if(docs[0].url.indexOf(req.url)==-1)
            res.status(400).send({'message':'error','details':'Unauthorized Access'})
        else
            next()
    })})
    
}