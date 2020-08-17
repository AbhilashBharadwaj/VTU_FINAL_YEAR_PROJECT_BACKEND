const documents = require('./../model/Document')
const license = require('../model/License')

module.exports = async (req,res,next)=>{
    //first get all documents owned
    //from that get the keys associated with it

    //extra get owner email from key redeemed status
    const doc_list = await documents.find({owner:req.user})

    
    let doc_id_list = []
    if(!doc_list)
        return res.status(400).send({'message':'error','details':'You do not own any documents'})
    doc_list.forEach((key)=>{
        doc_id_list.push(key['_id'])
    })

    
    let key_list = []
    let count = 0
    doc_id_list.forEach((key)=>{
        license.find({'document_id':key}).then((val)=>{
            console.log(val)
           appendKeys(val)
        })
    })

    const appendKeys = (key)=>{
        key_list.push(key)
        count++
        if(count==doc_id_list.length)
            return res.send({'message':'success','details':key_list})
        
    }

}