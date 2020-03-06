const hash = require('object-hash')
const document = require('../model/Document')
const license = require('../model/License')
const keygen = require("keygenerator");
const verify = require('../model/DocumentValidation');
const crypto = require('crypto')
const fs = require('fs')
const moment = require('moment')
module.exports.newDocument = async (req,res,next)=>{
    
    if(!req.files['document'] || req.files['document']==undefined)
            return res.status(400).send({'message':'error','details':'couldnt upload file'})
    
            function checksumFile(hashName, path) {
                return new Promise((resolve, reject) => {
                  const hash = crypto.createHash(hashName);
                  const stream = fs.createReadStream(path);
                  stream.on('error', err => reject(err));
                  stream.on('data', chunk => hash.update(chunk));
                  stream.on('end', () => resolve(hash.digest('hex')));
                });
              }



            const hash_value = await checksumFile('sha1',req.files['document'][0].path)
            
            const duplicate = await document.findOne({'hash':hash_value})
            if(duplicate)
            {
              fs.unlinkSync(req.files['document'][0].path)
              return res.status(400).send({'message':'error','details':'Document already exists'})
            }

            function cover_check(){
                if(!(req.files['cover']) || req.files['cover'][0]==undefined)
                    return undefined
                else
                    return req.files['cover'][0].path
            }

            const new_doc = new document({
            company : req.body.company,
            street : req.body.street,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip,
            author : req.body.author,
            file_url : req.files['document'][0].path,
            owner : req.user,
            file_name : req.body.file_name,
            hash:hash_value,
            cover_url : cover_check()
        })

        const {error} = verify({
            company : req.body.company,
            street : req.body.street,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip,
            author : req.body.author,
            file_url : req.files['document'][0].path,
            owner : req.user,
            file_name : req.body.file_name,
            hash:hash_value
        })
        
        if(error)
        {   //delete uploaded documents
            return res.status(400).send({'message':'error','details':error.details[0].message})
        }

        var date = undefined
        if('expiry' in req.body)
            if(!isNaN(Number(req.body.expiry)) && Number.isInteger(Number(req.body.expiry))){
                //ensuring atleast 1 day grace period
                if(moment().add(req.body.expiry,'seconds').isAfter(moment().add(1,'days')))
                    date = req.body.expiry
                else
                return res.send({'message':'error','details':'License expiry must be atleast greater than a day'})
            }
            else{
                return res.send("Enter expiry in seconds without \" \"")
            }

        
        const operation = await new_doc.save()
        const list_of_keys = new Array()
        if(operation){
            //generate hash
        var no_of_keys = ('keys' in req.body)?req.body.keys:0

            while(no_of_keys>0)
            {
               var hash_val =  hash(operation._id+keygen.number())
               
               const new_key = new license({
                   key : hash_val,
                   document_id : operation._id,
                   validity:date
               })
                const result = await new_key.save()
                list_of_keys.push(result.key)
                no_of_keys--;
            }
                
        }

        //apply filter on keys(optional)
        return res.send({'message':'success','details':list_of_keys})
    
}

module.exports.existingDocument = async (req,res)=>{

    //wee need to check if the user is the owner of the document
    if(!('document_id' in req.body) || !('keys' in req.body))
        return res.status(400).send({'message':'error','details':'Missing Parameters'})
    var result;
   try{
    result = await document.findById(`${req.body.document_id}`)
   }catch(error){return res.status(400).send({'message':'error','details:':'No such document exists'})}
    if(!result)
        return res.status(400).send({'message':'error','details:':'No such document exists'})

    if(result.owner != req.user)
        return res.status(400).send({'message':'error','details':'You don\'t own this document'})


    var date = undefined
        if('expiry' in req.body)
            if(!isNaN(Number(req.body.expiry)) && Number.isInteger(Number(req.body.expiry))){
                //ensuring atleast 1 day grace period
                if(moment().add(req.body.expiry,'seconds').isAfter(moment().add(1,'days')))
                    date = req.body.expiry
                else
                return res.send({'message':'error','details':'License expiry must be atleast greater than a day'})
            }
            else{
                return res.send("Enter expiry in seconds without \" \"")
            }

    //generate keys
    if(Number.isInteger(Number(req.body.keys))==false)
            return res.send({'message':'error','details':'keys can only be integer values'})
   var list_of_keys = []
   var no_of_keys = Number(req.body.keys)
    while(no_of_keys>0)
            {
               var hash_val =  hash(result._id+keygen.number())
               
               const new_key = new license({
                   key : hash_val,
                   document_id : result._id,
                   validity : date
               })
                const result_keys = await new_key.save()
                list_of_keys.push(result_keys.key)
                no_of_keys--;
            }
    return res.status(200).send({'message':'success','details':list_of_keys})
}
