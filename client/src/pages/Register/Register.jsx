import React, { useContext } from 'react';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import RegisterSchema from './RegisterSchema';
import { toast, ToastContainer } from 'react-toastify'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Register.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import context from '../../context/Context';
import { useTranslation } from 'react-i18next';

const Register = () => {
    const { modalText, setModalText } = useContext(context);
    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    const server_url = import.meta.env.VITE_SERVER_URL;

    const navigate = useNavigate();

    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: {
            email: '',
            username: "",
            password: '',
        },
        validationSchema: RegisterSchema(t),
        onSubmit: async (values) => {
            try {
                const res = await fetch(`${server_url}/create-account`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values),
                })
                const data = await res.json();

                if (!res.ok) {
                    // Extract the error message from the server response
                    throw new Error(data.message);
                }
                if (data.statusCode == 201) {
                    setShowModal(true)
                    setModalText(data.message)

                    // toast.success(data.message)
                    setTimeout(() => {
                        // navigate('/login')
                    }, 1300)
                }
            } catch (error) {

                toast.error(error.message)

            }

        }
    })


    const showHidePassword = () => {
        setShow(sh => !sh)
    }


    return (
        <div className='register-div'>
            <h2>{t('register')}</h2><br></br>
            <form onSubmit={handleSubmit}>

                <label htmlFor="username">{t('username')}</label>
                <input onChange={handleChange} type="text" id="username" /><div></div>
                {errors.username && <span className="error-message">{errors.username}</span>}
                <label htmlFor="email">{t('email')}</label>
                <input onChange={handleChange} type="email" id="email" />
                {errors.email && <span className="error-message">{errors.email}</span>}
                {
                    show == true ?
                        <FaEye className='hide-btn' onClick={showHidePassword} />

                        :
                        <FaEyeSlash className='hide-btn' onClick={showHidePassword} />
                }

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
                    <label htmlFor="password">{t('password')}</label>
                    <input onChange={handleChange} type={!show ? "password" : "text"} id="password" />
                    {errors.password && <span className="error-message">{errors.password}</span>}

                </div>
                <button type='submit'>{t('register')}</button>
            </form>
            <Link to='/login'>{t('already_have_account')}</Link>
            <ToastContainer />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('information')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('close')}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {t('ok')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Register;
