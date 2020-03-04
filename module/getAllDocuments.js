const documents = require('./../model/Document')
const license = require('../model/License')
module.exports = async(req,res,next)=>{
   const redeemer_id = await license.find({'redeemer_id':req.user}) //we dont need to verify if req.user exists because it is already taken care of in middlewareTokens
    if(!redeemer_id)
        return res.send({'message':'success','details':'No documents available'}) //no result
    var list_of_documents = []
    for(let items in redeemer_id){
        const result = await documents.findOne({'_id':redeemer_id[items].document_id})
        list_of_documents.push({
            'author' : result.author,
            'company': result.company,
            'file_name' : result.file_name,
            'cover_url' : result.cover_url,
            'document_id': result._id
        })
    }

    return res.send({'message':'success','details':list_of_documents})

}