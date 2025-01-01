import React, { useContext, useEffect } from 'react';
import { GiGraduateCap } from 'react-icons/gi'
import * as FiIcons from 'react-icons/fi'
import * as BiIcons from 'react-icons/bi'
import * as BsIcons from 'react-icons/bs'

import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as FaIcons from 'react-icons/fa'
import { NavbarData } from './NavbarData';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons/lib';
import './Navbar.css'
import { useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import context from '../../context/Context';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [navActive, setNav] = useState('');
    const { t } = useTranslation();
    const navg = useNavigate();
    const { user } = useContext(context);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');
    let token = localStorage.getItem('token');

    const location = useLocation();
    const hideNavbar = new URLSearchParams(location.search).get("hideNavbar");


    const handleClose = () => {
        setShowModal(false);
    }

    const NavClick = (e) => {
        navActive == 'active' ? setNav('') : setNav('active');
    }

    const logOut = () => {
        setModalText(t('logout_confirmation'))
        if (token) {

            localStorage.removeItem('token')
            localStorage.removeItem('user')

            navg('/login')
        }
    }
    useEffect(() => {
        if (hideNavbar == "true") {
            // Hide the navbar
            document.querySelector(".navbar").style.display = "none";
            document.querySelector(".home").style.marginLeft = "-37px";
            document.querySelector(".save").style.display = "none";

        }
    }, [hideNavbar]);

    return (
        <div className={`navbar ${navActive}`} >

            <div className="logo-content">
                <div className="logo">
                    <GiGraduateCap className='img' />
                    <div className="logo-name">GPA</div>
                </div>
                <FiIcons.FiMenu id='btn' onClick={NavClick} className={navActive} />
            </div>

            <ul className="nav-list">
                {
                    NavbarData(t).map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.path} className={`${item.cName}`} >
                                    <div className='ic'>
                                        {item.icon}
                                    </div>
                                    <span>{item.title}</span>
                                </Link>
                                <span className='tooltip'>{item.title}</span>
                            </li>
                        )
                    })}
            </ul>

            <div className="profile-content">
                <div className="profile">
                    <div className="profile-details">
                        {/* <img src={user1} alt="" /> */}
                        <FaIcons.FaUserGraduate className='img' />

                        <div className="name-job">
                            <div className="name">
                                {token ? JSON.parse(localStorage.getItem('user'))?.username : 'no user'}
                                {/* {'user'} */}
                            </div>
                            <div className="job">
                                {token ? JSON.parse(localStorage.getItem('user'))?.email : 'no email'}

                            </div>
                        </div>
                    </div>
                    <div id="exit">
                        <button onClick={() => setShowModal(true)}>
                            <BiIcons.BiLogOut />
                        </button>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('information')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('logout_confirmation')}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('no')}
                    </Button>
                    <Button variant="primary" onClick={logOut}>
                        {t('yes')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}

export default Navbar;
