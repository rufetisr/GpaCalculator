import React from 'react'
import './Section.css'
import { useRef, useContext, useState } from "react";
import context from '../Context/Context';

const Section = () => {
    // const {po, setPo, cred, setCred} = useContext(context);
    const inp = useRef(0);
    // const [value, setvalue] = useState();
    // const c = useRef();
    // setCred(c);
    // setPo(p);
    const Change = (e) => {
        let num = +e.target.value;
        console.log(num +1);
        if (num < 0 || num > 100) {
            alert('You can give 1 and 100');
        }
        if (num > 100) {
            e.target.value = 100;
        }
        else if(num < 0){
            e.target.value = 0;
        }
        // console.log(e.target.value);
    }
    const Change1 = (e) => {
        let num = +e.target.value;
        if (num < 0 || num > 20) {
            alert('You can give 1 and 20');            
        }
        if (num > 20) {
            e.target.value = 20;
        }
        else if(num < 0){
            e.target.value = 0;
        }
        // console.log(e.target.value);
    }

    return (
        <div className='section' style={{ display: 'flex' }}>
            {/* <input type="text" className='subject' /> */}
            <input onChange={Change} type="number" className='point' min='0' max='100' ref={inp} onClick={(e)=>{e.target.select()}}/>
            <input onChange={Change1} type="number" className='credit' min='0' max='20' ref={inp} onClick={(e)=>{e.target.select()}}/>
        </div>
    )
}

export default Section;