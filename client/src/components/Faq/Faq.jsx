import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './Faq.css'
import formula from '../../assets/formula.png'

const Faq = () => {

  return (
    <div className='faq'>
      <h4>Frequently asked questions</h4><br></br>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is the gpa formula behind this calculator ?</Accordion.Header>
          <Accordion.Body>
            <img src={formula} alt="" style={{ maxWidth: '290px', width: '100%' }} />
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}

export default Faq;
