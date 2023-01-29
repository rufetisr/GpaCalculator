import React from 'react'
import './Section.css'
import { useRef, useContext } from "react";
import context from '../Context/Context';

const Section = () => {
    const {po, setPo, cred, setCred} = useContext(context);
    const p = useRef();
    const c = useRef();
    setCred(c);
    setPo(p);

    return (
        <div className='section' style={{ display: 'flex' }}>
            {/* <input type="text" className='subject' /> */}
            <input type="number" className='point' ref={p}/>
            <input type="number" className='credit' ref={c}/>
        </div>
    )
}

export default Section;