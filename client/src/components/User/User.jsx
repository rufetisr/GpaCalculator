import React from 'react';
import './User.css'
import { useTranslation } from 'react-i18next';


const Profile = () => {
  const { t } = useTranslation();

  return (
    <div className='user-cont'>
      {t('navbar_user')}
    </div>
  );
}

export default Profile;
