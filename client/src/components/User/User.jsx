import React, { useEffect, useState } from 'react';
import './User.css'
import { useTranslation } from 'react-i18next';
import UserProfile from '../UserProfile/UserProfile';


const Profile = () => {
  const { t } = useTranslation();

  return (
    <div className='user-cont'>
      <h4>{t('navbar_user')}</h4>

      <UserProfile />
    </div>
  );
}

export default Profile;
