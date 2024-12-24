import React from 'react'
import './Section.css'
import { useRef, useContext, useState } from "react";
import context from '../context/Context';

const Section = () => {
    // const {po, setPo, cred, setCred} = useContext(context);
    // const inp = useRef(0);
    // const [value, setvalue] = useState();
    // const c = useRef();
    // setCred(c);
    // setPo(p);
    const Change = (e) => {
        let num = +e.target.value;
        console.log(num + 1);
        if (num < 0 || num > 100) {
            alert('You can give between 0 and 100');
        }
        if (num > 100) {
            e.target.value = 100;
        }
        else if (num < 0) {
            e.target.value = 0;
        }
        // console.log(e.target.value);
    }
    const Change1 = (e) => {
        let num = +e.target.value;
        if (num < 0 || num > 20) {
            alert('You can give between 0 and 20');
        }
        if (num > 20) {
            e.target.value = 20;
        }
        else if (num < 0) {
            e.target.value = 0;
        }
        // console.log(e.target.value);
    }

    return (
        <div className='section' style={{ display: 'flex' }}>
            {/* <input type="text" className='subject' /> */}
            <input onChange={Change} type="number" className='point' min='0' max='100' onClick={(e) => { e.target.select() }} onFocus={(e) => { e.currentTarget.style.backgroundColor = '#e4e6e7' }} onBlur={(e) => { e.currentTarget.style.backgroundColor = 'white' }} />
            <input onChange={Change1} type="number" className='credit' min='0' max='20' onClick={(e) => { e.target.select() }} onFocus={(e) => { e.currentTarget.style.backgroundColor = '#e4e6e7' }} onBlur={(e) => { e.currentTarget.style.backgroundColor = 'white' }} />
        </div>
    )
}

export default Section;