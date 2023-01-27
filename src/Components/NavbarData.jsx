import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as FaIcons from 'react-icons/fa'
import React from 'react'

export const NavbarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text',
    },
    {
        title: 'FAQ',
        path: '/faq',
        icon: <RiIcons.RiQuestionAnswerFill/>,
        cName: 'nav-text',
    },
    {
        title: 'User',
        path: '/user',
        icon: <FaIcons.FaUserGraduate/>,
        cName: 'nav-text',
    },
    {
        title: 'Setting',
        path: '/setting',
        icon: <RiIcons.RiSettings4Fill/>,
        cName: 'nav-text',
    },

  
]

