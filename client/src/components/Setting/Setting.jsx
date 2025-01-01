import React from 'react';
import './Setting.css'
import { useTranslation } from 'react-i18next';
// import { useContext } from 'react';
// import context from '../Context/Context';

const Setting = () => {
  const { t } = useTranslation();

  // const {count } = useContext(context)

  return (
    <div className='setting'>
      {t('navbar_setting')}
    </div>
  );
}

export default Setting;
