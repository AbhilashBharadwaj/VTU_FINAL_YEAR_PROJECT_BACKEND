const license = require('../model/License')
const moment = require('moment')
module.exports = async (req,res,next)=>{
    const key = req.body.key
    const lick = await license.findOne({'key':key})
    if(lick && lick.redeemer_id==undefined){
        //ensure if license is not redeemed by checking if redeemer id is not empty
        //check for validity before doing the below line
        console.log("User ID "+req.user)
        const expiry = lick.validity!=undefined?moment().add(lick.validity,'seconds').toDate():undefined
        await license.findOneAndUpdate({'key':key},{'expireAt':expiry,'redeemer_id':req.user})
        return res.send({'message':'success','details':lick.document_id})
    }
    else{
        return res.send({'message':'error','details':'Invalid License Key or License key might have already been redeemed'})
    }
}