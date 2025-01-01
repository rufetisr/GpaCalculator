import { AiFillHome } from 'react-icons/ai';
import { RiQuestionAnswerFill, RiSettings4Fill } from 'react-icons/ri';
import { FaUserGraduate } from 'react-icons/fa';
import { LuDownload } from "react-icons/lu";
import React from 'react'


export const NavbarData = (t) => [
    {
        title: t('navbar_home'),
        path: '/home',
        icon: <AiFillHome />,
        cName: 'nav-text',
    },
    {
        title: t('navbar_faq'),
        path: '/faq',
        icon: <RiQuestionAnswerFill />,
        cName: 'nav-text',
    },
    {
        title: t('navbar_user'),
        path: '/user',
        icon: <FaUserGraduate />,
        cName: 'nav-text',
    },
    {
        title: t('navbar_setting'),
        path: '/setting',
        icon: <RiSettings4Fill />,
        cName: 'nav-text',
    },
    {
        title: t('navbar_saved'),
        path: '/saved',
        icon: <LuDownload />,
        cName: 'nav-text',
    },

]

