import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './Faq.css'
import formula from '../../assets/formula.png'
import { useTranslation } from 'react-i18next';

const Faq = () => {
  const { t } = useTranslation();

  return (
    <div className='faq'>
      <h4>{t('faq_title')}</h4><br />
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t('faq_question')}</Accordion.Header>
          <Accordion.Body>
            <img src={formula} alt={t('faq_image_alt')} style={{ maxWidth: '290px', width: '100%' }} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Faq;
