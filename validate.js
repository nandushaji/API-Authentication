const Joi = require('@hapi/joi');

const registerValidate=(req)=>{
    const schema = Joi.object( {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    });

    const validation =  schema.validate(req.body);
    return validation;
}
const loginValidate=(req)=>{
    const schema = Joi.object( {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()

    });

    const validation =  schema.validate(req.body);
    return validation;
}

module.exports.registerValidate=registerValidate;
module.exports.loginValidate=loginValidate;


