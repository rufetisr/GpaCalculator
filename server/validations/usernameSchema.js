const Joi = require('joi')

const usernameSchema = Joi.object({
    newUsername: Joi.string().min(3).required(),

})

module.exports = usernameSchema;