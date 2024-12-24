const Joi = require('joi')

// we are applying validation for the server as the same in frontend to improve server-side security
/*
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    username: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(12, 'Name must be max 12 characters!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(30, 'Password must be max 30 characters!')
        .required('Required')
*/
const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required(),
})

module.exports = registerSchema;

// const data = {
//     name: 'John',
//     email: 'john@example.com',
//     password: 'serdgsf',
// }

// const { error, value } = schema.validate(data)

// if (error) {
//     console.log('Validation Error:', error.details[0].message);
// } else {
//     console.log('Validation Passed:', value);
// }