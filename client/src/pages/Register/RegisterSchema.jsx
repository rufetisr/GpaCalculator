// import React from 'react';
import * as Yup from 'yup';

const RegisterSchema = (t) => Yup.object().shape({
    email: Yup.string()
        .email(t('invalid_email'))
        .required(t('required')),
    username: Yup.string()
        .min(3, t('username_min'))
        .max(12, t('username_max'))
        .required(t('required')),
    password: Yup.string()
        .min(8, t('password_min'))
        .max(30, t('password_max'))
        .required(t('required'))
})


export default RegisterSchema;