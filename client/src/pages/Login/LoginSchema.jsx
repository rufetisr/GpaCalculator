// import React from 'react';
import * as Yup from 'yup';

const LoginSchema = (t) => Yup.object().shape({
    email: Yup.string()
        .email(t('invalid_email'))
        .required('Required!'),
    password: Yup.string()
        .min(8, t('password_min'))
        .max(30, t('password_max'))
        .required(t('required'))
})


export default LoginSchema;