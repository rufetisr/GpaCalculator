import React from 'react';
import { GiGraduateCap } from 'react-icons/gi'
import * as FiIcons from 'react-icons/fi'
import * as BiIcons from 'react-icons/bi'
import * as BsIcons from 'react-icons/bs'

import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as FaIcons from 'react-icons/fa'

import { NavbarData } from './NavbarData';
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons/lib';
import './Navbar.css'
import { useState, useRef } from "react";

const Navbar = () => {
    const [navActive, setNav] = useState('');

    const NavClick = (e)=>{
        navActive == 'active' ? setNav('') : setNav('active');
    }
    const SearchClick = (e)=>{
        setNav('active');
    }

    return (
        <div className={`navbar ${navActive}`} >

            <div className="logo-content">
                <div className="logo">
                    <GiGraduateCap className='img' />
                    <div className="logo-name">GPA</div>
                </div>
                <FiIcons.FiMenu id='btn' onClick={NavClick} className={navActive}/>
            </div>

            <ul className="nav-list">
                <li className='search' onClick={SearchClick}>
                    {/* <a href="#"> */}
                    <BsIcons.BsSearch className='box-search' />
                    <input type="text" placeholder='Search...' />
                    {/* </a> */}
                </li>
                {
                    NavbarData.map((item, index) => {
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
                        <img src="src\assets\user1.jpg" alt="" />
                        <div className="name-job">
                            <div className="name">
                                Rufet Isr
                            </div>
                            <div className="job">
                                Developer
                            </div>
                        </div>
                    </div>
                    <div id="exit">
                        <BiIcons.BiLogOut />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Navbar;
