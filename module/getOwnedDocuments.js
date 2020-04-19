const documents = require('./../model/Document')
const license = require('../model/License')

module.exports = async (req,res,next)=>{
    //get all doucements owned by the current owner(from token)
    const document_list = await documents.find({'owner':req.user})
    if(!document_list)
        return res.send({'message':'success','details':'No documents available'})
    
    let data_list = []
    for(let items in document_list){
        
        data_list.push(
            {
                id:document_list[items]['_id'],
                company:document_list[items].company,
                street:document_list[items].street,
                city:document_list[items].city,
                state:document_list[items].state,
                zip:document_list[items].zip,
                author:document_list[items].author,
                filename:document_list[items]['file_name'],
                createdAt:document_list[items].createdAt
            }
        )
    }
    return res.send({'message':'success','details':data_list})
}