
module.exports = (req)=>{
    const Joi = require('@hapi/joi')
    const body = req.body
    const schema = Joi.object({
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    })
    delete body['validation'] // we do this to remove the extra field
    return schema.validate(body) //JSON object
    }