
module.exports = (req)=>{
const Joi = require('@hapi/joi')
const body = req.body
const schema = Joi.object({
    name : Joi.string().min(6).required(),
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required()
})
delete body['validation'] // we do this to remove the extra field
if('role' in body)
    delete body['role']
return schema.validate(body) //JSON object
}