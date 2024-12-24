// import React from 'react';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    username: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(12, 'Name must be max 12 characters!')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(30, 'Password must be max 30 characters!')
        .required('Required')
})


export default RegisterSchema;