import Joi from '@hapi/joi'

export const schemaRegister = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(15).required()
})