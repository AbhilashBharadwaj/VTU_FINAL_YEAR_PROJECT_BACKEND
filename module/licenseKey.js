const hash = require('object-hash')
const document = require('../model/Document')
const license = require('../model/License')
const keygen = require("keygenerator");
const verify = require('../model/DocumentValidation');
const crypto = require('crypto')
const fs = require('fs')
module.exports.newDocument = async (req,res,next)=>{
    
    if(!req.file)
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



            const hash_value = await checksumFile('sha1',req.file.path)
            
            const duplicate = await document.findOne({'hash':hash_value})
            if(duplicate)
            {
              fs.unlinkSync(req.file.path)
              return res.status(400).send({'message':'error','details':'Document already exists'})
            }


            const new_doc = new document({
            company : req.body.company,
            street : req.body.street,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip,
            author : req.body.author,
            file_url : req.file.path,
            owner : req.body.owner,
            file_name : req.body.file_name,
            hash:hash_value
        })

        const {error} = verify({
            company : req.body.company,
            street : req.body.street,
            city : req.body.city,
            state : req.body.state,
            zip : req.body.zip,
            author : req.body.author,
            file_url : req.file.path,
            owner : req.body.owner,
            file_name : req.body.file_name,
            hash:hash_value
        })

        
        if(error)
            return res.status(400).send({'message':'error','details':error.details[0].message})


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
                   document_id : operation._id
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

    //generate keys
   var list_of_keys = []
   var no_of_keys = req.body.keys
    while(no_of_keys>0)
            {
               var hash_val =  hash(result._id+keygen.number())
               
               const new_key = new license({
                   key : hash_val,
                   document_id : result._id
               })
                const result_keys = await new_key.save()
                list_of_keys.push(result_keys.key)
                no_of_keys--;
            }
    return res.status(200).send({'message':'success','details':list_of_keys})
}
