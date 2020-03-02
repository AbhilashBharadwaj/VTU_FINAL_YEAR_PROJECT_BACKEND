module.exports = (data)=>{
    const Joi = require('@hapi/joi')
    
    const schema = Joi.object({
        company : Joi.string().min(6).required(),
        street : Joi.string().min(6).required(),
        city : Joi.string().min(6).required(),
        state : Joi.string().min(6).required(),
        zip :   Joi.string().max(6).min(6).required(),
        author : Joi.string().min(6).required(),
        file_url : Joi.string().min(6).required(),
        owner : Joi.string().min(6).required(),
        file_name : Joi.string().min(6).required(),
        hash : Joi.string().min(6).required()
    })

    return schema.validate(data) //JSON object
    }