import React from 'react'
import './HorizontalLine.css'

const HorizontalLine = ({ title }) => {
    return (
        <div style={{ display: 'flex' }}>
            <p className="line"></p>
            <span className="or">{title}</span>
            <p className="line"></p>
        </div>
    )
}

export default HorizontalLine