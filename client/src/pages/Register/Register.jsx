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

const Register = () => {
    const { modalText, setModalText } = useContext(context);

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
        validationSchema: RegisterSchema,
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
            <h2>Register</h2><br></br>
            <form onSubmit={handleSubmit}>

                <label htmlFor="username">Username</label>
                <input onChange={handleChange} type="text" id="username" required /><div></div>
                <label htmlFor="email">Email</label>
                <input onChange={handleChange} type="email" id="email" required />
                {
                    show == true ?
                        <FaEye className='hide-btn' onClick={showHidePassword} />

                        :
                        <FaEyeSlash className='hide-btn' onClick={showHidePassword} />
                }

                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-10px' }}>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type={!show ? "password" : "text"} id="password" required />
                </div>
                <button type='submit'>Register</button>
            </form>
            <Link to='/login'>Already have an account ?</Link>
            <ToastContainer />
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Register;
