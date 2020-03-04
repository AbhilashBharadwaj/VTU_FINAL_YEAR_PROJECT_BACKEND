const jwt = require('jsonwebtoken')
const app_config = require('../../../model/app_config')
module.exports = (req,res,next)=>{
    
    const token = req.header('auth-token') 
    if(!token)
        return res.status(401).send({'message':'error','details':'Access Denied'})
    try{
        const verify = jwt.verify(token,app_config.TOKEN_SECRET)
        req.user = verify._id
        next()
    }catch(err){
        return res.status(400).send({'message':'error','details':'Invaid Token'})
    }
}