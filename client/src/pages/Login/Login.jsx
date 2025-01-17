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
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import HorizontalLine from '../../components/HorizontalLine/HorizontalLine';

function Login() {
    // const { setUser } = useContext(context);
    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShowModal(false);

    const server_url = import.meta.env.VITE_SERVER_URL;
    const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;


    const navigate = useNavigate();

    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema(t),
        onSubmit: async (values) => {
            setLoading(true);
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
                    localStorage.setItem('user', JSON.stringify({
                        username: data?.data?.username,
                        email: data?.data?.email,
                    }))

                    // setTimeout(() => {
                    navigate('/home')
                    // }, 1200)
                }
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setLoading(false);
            }


        }

    })

    const GoogleLoginSuccess = async (resp) => {
        setLoading(true);

        try {
            const res = await fetch(`${server_url}/login-google-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resp),
            })
            const data = await res.json();

            if (data.statusCode == 200) {
                toast.success(data.message)

                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify({
                    username: data?.data?.username,
                    email: data?.data?.email,
                }))

                navigate('/home')
            }
        }
        catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    const GoogleLoginFail = (res) => {
        toast.error(res)
    }

    const showHidePassword = () => {
        setShow(sh => !sh)
    }

    return (
        <GoogleOAuthProvider clientId={client_id}>
            <div className='login-div'>
                {
                    !loading ?
                        <>
                            <h2>{t('login')}</h2>
                            <form onSubmit={handleSubmit}>
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

                                <button type='submit'>{t('login')}</button>
                                <br></br>
                                <HorizontalLine title='or' />
                                <br></br>
                                <GoogleLogin size="large"
                                    onSuccess={GoogleLoginSuccess}
                                    onError={GoogleLoginFail}
                                    // auto_select='true'                                   
                                    useOneTap
                                    shape="circle"
                                    context="Sign in"
                                    logo_alignment="left"
                                // cancel_on_tap_outside='true'
                                />
                            </form>
                            <br></br>
                            <Link to='/register'>{t('dont_have_account')}</Link>

                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{t('information')}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>{t('modal_message')}</Modal.Body>
                                <Modal.Footer>
                                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button> */}
                                    <Button variant="primary" onClick={handleClose}>
                                        {t('ok')}
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <ToastContainer />

                        </> : <Loader />
                }
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;