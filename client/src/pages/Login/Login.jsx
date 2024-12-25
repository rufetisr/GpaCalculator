import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import LoginSchema from './LoginSchema';
import { toast, ToastContainer } from 'react-toastify'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Login.css'
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import context from '../../context/Context';

function Login() {
    // const { setUser } = useContext(context);

    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    const server_url = import.meta.env.VITE_SERVER_URL;


    const navigate = useNavigate();

    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            try {
                const res = await fetch(`${server_url}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values),
                })

                const data = await res.json();
                if (!res.ok) {

                    if (res.status == 403) {
                        setShowModal(true)
                    }
                    else {
                        // Extract the error message from the server response
                        throw new Error(data.message);
                    }

                }
                else if (data.statusCode == 200) {
                    toast.success(data.message)

                    localStorage.setItem('token', data.token)

                    setTimeout(() => {
                        navigate('/home')
                    }, 1200)
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
        <div className='login-div'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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

                <button type='submit'>Login</button>
            </form>
            <Link to='/register'>You don't have an account ?</Link>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please verify your email by using the link in your email!</Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    <Button variant="primary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />

        </div>

    );
}

export default Login;